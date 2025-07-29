import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import TodoForm from "@/components/molecules/TodoForm";
import TodoList from "@/components/organisms/TodoList";
import { Button } from "@/components/atoms/Button";
export function TodoTemplate({ todos, filter, onAddTodo, onToggle, onStatusChange, onDelete, onFilterChange, }) {
    const filters = ["すべて", "未完了", "完了", "保留", "リスケ"];
    return (_jsxs("div", { className: "max-w-xl mx-auto mt-10 p-6 bg-white shadow rounded", children: [_jsx("h1", { className: "text-3xl font-bold mb-6 text-center", children: "TODO \u30A2\u30D7\u30EA" }), _jsx(TodoForm, { onAddTodo: onAddTodo }), _jsx("div", { className: "flex justify-center gap-2 mb-4", children: filters.map((f) => (_jsx(Button, { label: f, active: filter === f, onClick: () => onFilterChange(f) }, f))) }), _jsx(TodoList, { todos: todos, onToggle: onToggle, onStatusChange: onStatusChange, onDelete: onDelete })] }));
}
