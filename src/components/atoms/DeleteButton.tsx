import React from "react";
interface DeleteButtonProps {
  onClick: () => void;
}

export function DeleteButton({ onClick }: DeleteButtonProps) {
  return (
    <button
      onClick={onClick}
      className="text-red-500 hover:text-red-700 transition"
      aria-label="Delete todo"
    >
      &#x2716;
    </button>
  );
}
