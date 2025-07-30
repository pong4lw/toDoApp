import React from "react";

interface SubmitButtonProps {
  label: string;
}

export function SubmitButton({ label }: SubmitButtonProps) {
  return (
    <button
      type="submit"
      className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition"
    >
      {label}
    </button>
  );
}
