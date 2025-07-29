import { jsx as _jsx } from "react/jsx-runtime";
export function DueDateLabel({ dueDate, isCompleted }) {
    if (!dueDate)
        return null;
    const formatted = new Date(dueDate).toLocaleString(undefined, {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
    });
    return (_jsx("time", { className: `text-sm ${isCompleted ? "text-green-500 line-through" : "text-gray-600"}`, dateTime: dueDate, children: formatted }));
}
