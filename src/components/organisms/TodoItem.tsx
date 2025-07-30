import React from "react";
import { TodoStatus } from "@/types";
import { Checkbox } from "../atoms/Checkbox";
import { StatusSelect } from "../atoms/StatusSelect";
import { DeleteButton } from "../atoms/DeleteButton";
import { DueDateLabel } from "../atoms/DueDateLabel";
import { TodoLabel } from "../molecules/TodoLabel";

interface TodoItemProps {
  id: string;
  text: string;
  status: TodoStatus;
  dueDate?: string | null;
  onToggle: (id: string) => void;
  onStatusChange: (id: string, status: TodoStatus) => void;
  onDelete: (id: string) => void;
}

export default function TodoItem({
  id,
  text,
  status,
  dueDate,
  onToggle,
  onStatusChange,
  onDelete,
}: TodoItemProps) {
  const isCompleted = status === "完了";

  return (
    <li
      className={`flex flex-col sm:flex-row sm:items-center justify-between py-3 px-4 border rounded-md shadow-sm transition
        ${isCompleted ? "bg-green-50" : "bg-white"}`}
    >
      <label className="flex items-center gap-2 cursor-pointer select-none">
        <Checkbox checked={isCompleted} onChange={() => onToggle(id)} />
        <TodoLabel text={text} isCompleted={isCompleted} />
      </label>

      <StatusSelect
        value={status}
        onChange={(newStatus) => onStatusChange(id, newStatus)}
      />

      <div className="flex items-center gap-4 mt-2 sm:mt-0">
        <DueDateLabel
          dueDate={dueDate ?? undefined}
          isCompleted={isCompleted}
        />
        <DeleteButton onClick={() => onDelete(id)} />
      </div>
    </li>
  );
}
