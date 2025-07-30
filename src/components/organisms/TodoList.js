import { jsx as _jsx } from "react/jsx-runtime";
import TodoItem from "./TodoItem";
export default function TodoList({ todos, onToggle, onStatusChange, onDelete, }) {
    return (_jsx("ul", { className: "mt-6 space-y-2", children: todos.map(({ id, memo, status, dueDate, projectId }) => (_jsx(TodoItem, { id: id, memo: memo, status: status, dueDate: dueDate, projectId: projectId, onToggle: onToggle, onStatusChange: onStatusChange, onDelete: onDelete }, id))) }));
}
