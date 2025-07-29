import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { TodoTemplate } from "@/components/templates/TodoTemplate";
export default function App() {
    const [todos, setTodos] = useState(() => {
        const saved = localStorage.getItem("todos");
        if (saved) {
            try {
                return JSON.parse(saved);
            }
            catch (e) {
                console.error("保存データの解析に失敗:", e);
            }
        }
        return [];
    });
    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos));
    }, [todos]);
    const addTodo = (text, dueDate) => {
        const newTodo = {
            id: Date.now(),
            text,
            status: "未完了",
            dueDate,
        };
        setTodos((prev) => [...prev, newTodo]);
    };
    const toggleTodo = (id) => {
        setTodos((prev) => prev.map((todo) => todo.id === id
            ? { ...todo, status: todo.status === "完了" ? "未完了" : "完了" }
            : todo));
    };
    const updateStatus = (id, newStatus) => {
        setTodos((prev) => prev.map((todo) => todo.id === id ? { ...todo, status: newStatus } : todo));
    };
    const deleteTodo = (id) => {
        setTodos((prev) => prev.filter((todo) => todo.id !== id));
    };
    const [filter, setFilter] = useState("すべて");
    const sortedTodos = [...todos].sort((a, b) => {
        if (a.dueDate && b.dueDate)
            return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
        if (a.dueDate)
            return -1;
        if (b.dueDate)
            return 1;
        return 0;
    });
    const filteredTodos = sortedTodos.filter((todo) => filter === "すべて" ? true : todo.status === filter);
    return (_jsx(TodoTemplate, { todos: filteredTodos, filter: filter, onAddTodo: addTodo, onToggle: toggleTodo, onStatusChange: updateStatus, onDelete: deleteTodo, onFilterChange: setFilter }));
}
