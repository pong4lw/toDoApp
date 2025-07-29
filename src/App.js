import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { TodoTemplate } from "@/components/templates/TodoTemplate";
import { db } from "@/firebase";
import { AuthProvider, useAuth } from "@/hooks/useAuth";
import { AuthForm } from "@/components/AuthForm";
import { LogoutButton } from "@/components/LogoutButton";
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc, } from "firebase/firestore";
function AppContent() {
    const user = useAuth();
    const [todos, setTodos] = useState([]);
    const [filter, setFilter] = useState("すべて");
    useEffect(() => {
        if (!user)
            return;
        const fetchTodos = async () => {
            const snapshot = await getDocs(collection(db, "todos"));
            const data = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setTodos(data);
        };
        fetchTodos();
    }, [user]);
    const addTodo = async (text, dueDate) => {
        if (!user)
            return;
        try {
            const newTodo = {
                text,
                status: "未完了",
                dueDate: dueDate ?? undefined,
                createdAt: new Date().toISOString(),
                userId: user.uid, // 任意: ユーザーごとに保存する場合
            };
            const docRef = await addDoc(collection(db, "todos"), newTodo);
            setTodos((prev) => [...prev, { ...newTodo, id: docRef.id }]);
        }
        catch (e) {
            console.error("Error adding todo:", e);
        }
    };
    const toggleTodo = async (id) => {
        const target = todos.find((t) => t.id === id);
        if (!target)
            return;
        const newStatus = target.status === "完了" ? "未完了" : "完了";
        await updateDoc(doc(db, "todos", id), { status: newStatus });
        setTodos((prev) => prev.map((todo) => todo.id === id ? { ...todo, status: newStatus } : todo));
    };
    const updateStatus = async (id, newStatus) => {
        await updateDoc(doc(db, "todos", id), { status: newStatus });
        setTodos((prev) => prev.map((todo) => todo.id === id ? { ...todo, status: newStatus } : todo));
    };
    const deleteTodo = async (id) => {
        await deleteDoc(doc(db, "todos", id));
        setTodos((prev) => prev.filter((todo) => todo.id !== id));
    };
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
    if (!user)
        return _jsx(AuthForm, {});
    return (_jsxs("div", { children: [_jsx("div", { className: "flex justify-end p-2", children: _jsx(LogoutButton, {}) }), _jsx(TodoTemplate, { todos: filteredTodos, filter: filter, onAddTodo: addTodo, onToggle: toggleTodo, onStatusChange: updateStatus, onDelete: deleteTodo, onFilterChange: setFilter })] }));
}
export default function App() {
    return (_jsx(AuthProvider, { children: _jsx(AppContent, {}) }));
}
