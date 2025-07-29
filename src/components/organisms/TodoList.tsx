import TodoItem from "./TodoItem";
import { Todo, TodoStatus } from "@/types";

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: number) => void;
  onStatusChange: (id: number, status: TodoStatus) => void;
  onDelete: (id: number) => void;
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
