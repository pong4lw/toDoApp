import { useEffect, useState } from "react";
import { TodoTemplate } from "@/components/templates/TodoTemplate";
import { db } from "@/firebase";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

export type TodoStatus = "未完了" | "完了" | "保留" | "リスケ";

export interface Todo {
  id: string;
  text: string;
  status: TodoStatus;
  dueDate?: string;
  createdAt?: string;
}

export default function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<
    "すべて" | "未完了" | "完了" | "保留" | "リスケ"
  >("すべて");

  useEffect(() => {
    const fetchTodos = async () => {
      const snapshot = await getDocs(collection(db, "todos"));
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Todo[];
      setTodos(data);
    };
    fetchTodos();
  }, []);

  const addTodo = async (text: string, dueDate?: string) => {
    try {
      const newTodo = {
        text,
        status: "未完了" as TodoStatus,
        dueDate: dueDate || null,
        createdAt: new Date().toISOString(),
      };
      const docRef = await addDoc(collection(db, "todos"), newTodo);
      setTodos((prev) => [...prev, { ...newTodo, id: docRef.id }]);
    } catch (e) {
      console.error("Error adding todo:", e);
    }
  };

  const toggleTodo = async (id: string) => {
    const target = todos.find((t) => t.id === id);
    if (!target) return;
    const newStatus = target.status === "完了" ? "未完了" : "完了";
    await updateDoc(doc(db, "todos", id), { status: newStatus });
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, status: newStatus } : todo,
      ),
    );
  };

  const updateStatus = async (id: string, newStatus: TodoStatus) => {
    await updateDoc(doc(db, "todos", id), { status: newStatus });
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, status: newStatus } : todo,
      ),
    );
  };

  const deleteTodo = async (id: string) => {
    await deleteDoc(doc(db, "todos", id));
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

  return (
    <TodoTemplate
      todos={filteredTodos}
      filter={filter}
      onAddTodo={addTodo}
      onToggle={toggleTodo}
      onStatusChange={updateStatus}
      onDelete={deleteTodo}
      onFilterChange={setFilter}
    />
  );
}
