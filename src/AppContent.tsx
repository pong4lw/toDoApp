import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
} from "firebase/firestore";
import { db } from "@/firebase";
import { Todo, TodoStatus } from "@/types";
import { useAuth } from "@/hooks/useAuth";
import { AuthForm } from "@/components/AuthForm";
import { LogoutButton } from "@/components/LogoutButton";
import { TodoTemplate } from "@/components/templates/TodoTemplate";
import { useProjects } from "@/hooks/useProjects";

export default function AppContent() {
  const user = useAuth();
  const { projects, loading } = useProjects();
  if (loading) return <p>読み込み中...</p>;

  const [filter, setFilter] = useState<
    "すべて" | "未完了" | "完了" | "保留" | "リスケ"
  >("すべて");

  const fetchTodos = async (): Promise<Todo[]> => {
    const snapshot = await getDocs(collection(db, "todos"));
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<Todo, "id">),
    }));
  };

  const {
    data: todos = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["todos"],
    queryFn: fetchTodos,
    enabled: !!user,
  });

  type AddTodoParams = {
    title: string;
    memo?: string;
    dueDate?: string;
    projectId?: string;
  };

  const addTodo = async ({
    title,
    memo,
    dueDate,
    projectId,
  }: AddTodoParams) => {
    if (!user) return;
    const newTodo: Omit<Todo, "id"> = {
      title: title,
      memo: memo,
      status: "未完了",
      dueDate: dueDate ?? undefined,
      isCompleted: false,
      createdAt: new Date().toISOString(),
      projectId: projectId,
      userId: user.uid,
    };
    await addDoc(collection(db, "tasks"), newTodo);
    refetch();
  };

  const toggleTodo = async (id: string) => {
    const target = todos.find((t) => t.id === id);
    if (!target) return;
    const newStatus = target.status === "完了" ? "未完了" : "完了";
    await updateDoc(doc(db, "todos", id), { status: newStatus });
    refetch();
  };

  const updateStatus = async (id: string, newStatus: TodoStatus) => {
    await updateDoc(doc(db, "todos", id), { status: newStatus });
    refetch();
  };

  const deleteTodo = async (id: string) => {
    await deleteDoc(doc(db, "todos", id));
    refetch();
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
  if (isLoading) return <div>読み込み中...</div>;
  if (filteredTodos.length === 0) return null;

  return (
    <>
      {projects.map((project) => (
        <div key={project.id} className="mb-8 border p-4 rounded">
          <h2 className="text-xl font-bold mb-2">{project.name}</h2>
          <TodoTemplate
            todos={filteredTodos.filter(
              (todo) => todo.projectId === project.id,
            )}
            filter={filter}
            onAddTodo={(todo) => addTodo({ ...todo, projectId: project.id })}
            onToggle={toggleTodo}
            onStatusChange={updateStatus}
            onDelete={deleteTodo}
            onFilterChange={setFilter}
          />
        </div>
      ))}
    </>
  );
}
