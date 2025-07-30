import React from "react";
import TodoItem from "./TodoItem";
import { Todo, TodoStatus } from "@/types";

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: string) => void;
  onStatusChange: (id: string, status: TodoStatus) => void;
  onDelete: (id: string) => void;
}

export default function TodoList({
  todos,
  onToggle,
  onStatusChange,
  onDelete,
}: TodoListProps) {
  return (
    <ul className="mt-6 space-y-2">
      {todos.map(({ id, memo, status, dueDate, projectId }) => (
        <TodoItem
          key={id}
          id={id}
          memo={memo}
          status={status}
          dueDate={dueDate}
          projectId={projectId}
          onToggle={onToggle}
          onStatusChange={onStatusChange}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}
