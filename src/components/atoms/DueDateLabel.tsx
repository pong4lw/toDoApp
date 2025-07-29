interface DueDateLabelProps {
  dueDate?: string;
  isCompleted: boolean;
}

export function DueDateLabel({ dueDate, isCompleted }: DueDateLabelProps) {
  if (!dueDate) return null;

  const formatted = new Date(dueDate).toLocaleString(undefined, {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <time
      className={`text-sm ${
        isCompleted ? "text-green-500 line-through" : "text-gray-600"
      }`}
      dateTime={dueDate}
    >
      {formatted}
    </time>
  );
}
