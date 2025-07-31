import { useEffect, useState } from "react";
import { TodoTemplate } from "@/components/templates/TodoTemplate";
import { db } from "@/lib/firebase";
import { Todo, TodoStatus } from "@/lib/types";
import { AuthProvider, useAuth } from "@/hooks/useAuth";
import { AuthForm } from "@/components/AuthForm";
import { LogoutButton } from "@/components/LogoutButton";
import TaskModal from "@/components/TaskModal";
import TaskItem from "@/components/TaskItem";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import "react-day-picker/dist/style.css";

function AppContent() {
  const user = useAuth();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<
    "すべて" | "未完了" | "完了" | "保留" | "リスケ"
  >("すべて");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // タスク一覧取得
  useEffect(() => {
    if (!user) return;
    const fetchTodos = async () => {
      const snapshot = await getDocs(collection(db, "tasks"));
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Todo, "id">),
      }));
      setTodos(data);
    };
    fetchTodos();
  }, [user]);

  // タスク追加
  const addTodo = async (todo: {
    title: string;
    memo?: string;
    dueDate?: string;
  }) => {
    if (!user) return;
    try {
      const newTodo: Omit<Todo, "id"> = {
        title: todo.title,
        memo: todo.memo,
        status: "未完了",
        dueDate: todo.dueDate ?? undefined,
        createdAt: new Date().toISOString(),
        userId: user.uid,
        isCompleted: false,
      };
      const docRef = await addDoc(collection(db, "tasks"), newTodo);
      setTodos((prev) => [...prev, { ...newTodo, id: docRef.id }]);
    } catch (e) {
      console.error("Error adding todo:", e);
    }
  };

  // タスクの完了切り替え
  const toggleTodo = async (id: string) => {
    const target = todos.find((t) => t.id === id);
    if (!target) return;
    const newStatus = target.status === "完了" ? "未完了" : "完了";
    await updateDoc(doc(db, "tasks", id), { status: newStatus });
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, status: newStatus } : todo,
      ),
    );
  };

  // ステータス更新
  const updateStatus = async (id: string, newStatus: TodoStatus) => {
    await updateDoc(doc(db, "tasks", id), { status: newStatus });
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, status: newStatus } : todo,
      ),
    );
  };

  // タスク削除
  const deleteTodo = async (id: string) => {
    await deleteDoc(doc(db, "tasks", id));
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  // 期日順で並び替え
  const sortedTodos = [...todos].sort((a, b) => {
    if (a.dueDate && b.dueDate)
      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    if (a.dueDate) return -1;
    if (b.dueDate) return 1;
    return 0;
  });

  // ステータス別でフィルター
  const filteredTodos = sortedTodos.filter((todo) =>
    filter === "すべて" ? true : todo.status === filter,
  );

  if (!user) return <AuthForm />;

  return (
    <div>
      <div className="flex justify-between items-center p-2">
        <h1 className="text-xl font-bold">タスク管理アプリ</h1>
        <LogoutButton />
      </div>

      <div className="px-4 py-2">
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          タスクを追加
        </button>
      </div>

      <TodoTemplate
        todos={filteredTodos}
        filter={filter}
        onAddTodo={() => setIsModalOpen(true)}
        onToggle={toggleTodo}
        onStatusChange={updateStatus}
        onDelete={deleteTodo}
        onFilterChange={setFilter}
      />

      {isModalOpen && (
        <TaskModal
          onClose={() => setIsModalOpen(false)}
          onSubmit={(todo) => {
            addTodo(todo);
            setIsModalOpen(false);
          }}
        />
      )}
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
