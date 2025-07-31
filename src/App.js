import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { TodoTemplate } from "@/components/templates/TodoTemplate";
import { db } from "@/lib/firebase";
import { AuthProvider, useAuth } from "@/hooks/useAuth";
import { AuthForm } from "@/components/AuthForm";
import { LogoutButton } from "@/components/LogoutButton";
import TaskModal from "@/components/TaskModal";
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc, } from "firebase/firestore";
import "react-day-picker/dist/style.css";
function AppContent() {
    const user = useAuth();
    const [todos, setTodos] = useState([]);
    const [filter, setFilter] = useState("すべて");
    const [isModalOpen, setIsModalOpen] = useState(false);
    // タスク一覧取得
    useEffect(() => {
        if (!user)
            return;
        const fetchTodos = async () => {
            const snapshot = await getDocs(collection(db, "tasks"));
            const data = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setTodos(data);
        };
        fetchTodos();
    }, [user]);
    // タスク追加
    const addTodo = async (todo) => {
        if (!user)
            return;
        try {
            const newTodo = {
                title: todo.title,
                memo: todo.memo,
                status: "未完了",
                dueDate: todo.dueDate ?? undefined,
                createdAt: new Date().toISOString(),
                userId: user.uid,
                isCompleted: false,
            };
            const docRef = await addDoc(collection(db, "tasks"), newTodo);
            setTodos((prev) => [...prev, { ...newTodo, id: docRef.id }]);
        }
        catch (e) {
            console.error("Error adding todo:", e);
        }
    };
    // タスクの完了切り替え
    const toggleTodo = async (id) => {
        const target = todos.find((t) => t.id === id);
        if (!target)
            return;
        const newStatus = target.status === "完了" ? "未完了" : "完了";
        await updateDoc(doc(db, "tasks", id), { status: newStatus });
        setTodos((prev) => prev.map((todo) => todo.id === id ? { ...todo, status: newStatus } : todo));
    };
    // ステータス更新
    const updateStatus = async (id, newStatus) => {
        await updateDoc(doc(db, "tasks", id), { status: newStatus });
        setTodos((prev) => prev.map((todo) => todo.id === id ? { ...todo, status: newStatus } : todo));
    };
    // タスク削除
    const deleteTodo = async (id) => {
        await deleteDoc(doc(db, "tasks", id));
        setTodos((prev) => prev.filter((todo) => todo.id !== id));
    };
    // 期日順で並び替え
    const sortedTodos = [...todos].sort((a, b) => {
        if (a.dueDate && b.dueDate)
            return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
        if (a.dueDate)
            return -1;
        if (b.dueDate)
            return 1;
        return 0;
    });
    // ステータス別でフィルター
    const filteredTodos = sortedTodos.filter((todo) => filter === "すべて" ? true : todo.status === filter);
    if (!user)
        return _jsx(AuthForm, {});
    return (_jsxs("div", { children: [_jsxs("div", { className: "flex justify-between items-center p-2", children: [_jsx("h1", { className: "text-xl font-bold", children: "\u30BF\u30B9\u30AF\u7BA1\u7406\u30A2\u30D7\u30EA" }), _jsx(LogoutButton, {})] }), _jsx("div", { className: "px-4 py-2", children: _jsx("button", { onClick: () => setIsModalOpen(true), className: "px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700", children: "\u30BF\u30B9\u30AF\u3092\u8FFD\u52A0" }) }), _jsx(TodoTemplate, { todos: filteredTodos, filter: filter, onAddTodo: () => setIsModalOpen(true), onToggle: toggleTodo, onStatusChange: updateStatus, onDelete: deleteTodo, onFilterChange: setFilter }), isModalOpen && (_jsx(TaskModal, { onClose: () => setIsModalOpen(false), onSubmit: (todo) => {
                    addTodo(todo);
                    setIsModalOpen(false);
                } }))] }));
}
export default function App() {
    return (_jsx(AuthProvider, { children: _jsx(AppContent, {}) }));
}
