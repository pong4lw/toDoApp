import React from "react";

interface TodoLabelProps {
  memo?: string;
  isCompleted: boolean;
}

export function TodoLabel({ memo, isCompleted }: TodoLabelProps) {
  return (
    <span
      className={`font-medium ${
        isCompleted ? "line-through text-green-600" : "text-gray-800"
      }`}
    >
      {memo}
    </span>
  );
}
