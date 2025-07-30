import { TodoStatus } from "@/types";
import React from "react";

interface StatusSelectProps {
  value: TodoStatus;
  onChange: (status: TodoStatus) => void;
}

export function StatusSelect({ value, onChange }: StatusSelectProps) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value as TodoStatus)}
      className="border border-gray-300 rounded p-1 mt-2 sm:mt-0"
    >
      <option value="未完了">未完了</option>
      <option value="完了">完了</option>
      <option value="保留">保留</option>
      <option value="リスケ">リスケ</option>
    </select>
  );
}
