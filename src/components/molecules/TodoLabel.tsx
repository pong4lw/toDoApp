import React from "react";

interface TodoLabelProps {
  text: string;
  isCompleted: boolean;
}

export function TodoLabel({ text, isCompleted }: TodoLabelProps) {
  return (
    <span
      className={`font-medium ${
        isCompleted ? "line-through text-green-600" : "text-gray-800"
      }`}
    >
      {text}
    </span>
  );
}
