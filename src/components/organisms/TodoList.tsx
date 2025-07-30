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
      {todos.map(({ id, text, status, dueDate }) => (
        <TodoItem
          key={id}
          id={id}
          text={text}
          status={status}
          dueDate={dueDate}
          onToggle={onToggle}
          onStatusChange={onStatusChange}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}
