import React from "react";
interface ButtonProps {
  active?: boolean;
  onClick: () => void;
  label: string;
}

export function Button({ active, onClick, label }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1 border rounded ${
        active ? "bg-blue-500 text-white" : "bg-gray-100"
      }`}
    >
      {label}
    </button>
  );
}
