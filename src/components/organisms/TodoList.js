import { jsx as _jsx } from "react/jsx-runtime";
import TodoItem from "./TodoItem";
export default function TodoList({ todos, onToggle, onStatusChange, onDelete, }) {
    return (_jsx("ul", { className: "mt-6 space-y-2", children: todos.map(({ id, text, status, dueDate }) => (_jsx(TodoItem, { id: id, text: text, status: status, dueDate: dueDate, onToggle: onToggle, onStatusChange: onStatusChange, onDelete: onDelete }, id))) }));
}
