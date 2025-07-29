import { useEffect, useState } from "react";
import { TodoTemplate } from "@/components/templates/TodoTemplate";

export type TodoStatus = "未完了" | "完了" | "保留" | "リスケ";

export interface Todo {
  id: number;
  text: string;
  status: TodoStatus;
  dueDate?: string;
}

export default function App() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const saved = localStorage.getItem("todos");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("保存データの解析に失敗:", e);
      }
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text: string, dueDate?: string) => {
    const newTodo: Todo = {
      id: Date.now(),
      text,
      status: "未完了",
      dueDate,
    };
    setTodos((prev) => [...prev, newTodo]);
  };

  const toggleTodo = (id: number) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id
          ? { ...todo, status: todo.status === "完了" ? "未完了" : "完了" }
          : todo,
      ),
    );
  };

  const updateStatus = (id: number, newStatus: TodoStatus) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, status: newStatus } : todo,
      ),
    );
  };

  const deleteTodo = (id: number) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const [filter, setFilter] = useState<
    "すべて" | "未完了" | "完了" | "保留" | "リスケ"
  >("すべて");

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
