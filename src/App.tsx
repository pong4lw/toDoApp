import { useEffect, useState } from "react";
import { TodoTemplate } from "@/components/templates/TodoTemplate";
import { db } from "@/firebase";
import { Todo, TodoStatus } from "@/types";
import { AuthProvider, useAuth } from "@/hooks/useAuth";
import { AuthForm } from "@/components/AuthForm";
import { LogoutButton } from "@/components/LogoutButton";
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

  const addTodo = async (todo: {
    title: string;
    memo?: string;
    dueDate?: string;
  }) => {
    const { title, memo, dueDate } = todo;
    if (!user) return;
    try {
      const newTodo: Omit<Todo, "id"> = {
        title: title,
        memo: memo,
        status: "未完了",
        dueDate: dueDate ?? undefined,
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

  const updateStatus = async (id: string, newStatus: TodoStatus) => {
    await updateDoc(doc(db, "tasks", id), { status: newStatus });
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, status: newStatus } : todo,
      ),
    );
  };

  const deleteTodo = async (id: string) => {
    await deleteDoc(doc(db, "tasks", id));
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const sortedTodos = [...todos].sort((a, b) => {
    if (a.dueDate && b.dueDate)
      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    if (a.dueDate) return -1;
    if (b.dueDate) return 1;
    return 0;
  });

  const filteredTodos = sortedTodos.filter((todo) =>
    filter === "すべて" ? true : todo.status === filter,
  );

  if (!user) return <AuthForm />;

  return (
    <div>
      <div className="flex justify-end p-2">
        <LogoutButton />
      </div>
      <TodoTemplate
        todos={filteredTodos}
        filter={filter}
        onAddTodo={addTodo}
        onToggle={toggleTodo}
        onStatusChange={updateStatus}
        onDelete={deleteTodo}
        onFilterChange={setFilter}
      />
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
