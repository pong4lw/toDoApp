import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs, } from "firebase/firestore";
import { db } from "@/firebase";
import { useAuth } from "@/hooks/useAuth";
import { AuthForm } from "@/components/AuthForm";
import { TodoTemplate } from "@/components/templates/TodoTemplate";
import { useProjects } from "@/hooks/useProjects";
export default function AppContent() {
    const user = useAuth();
    const { projects, loading } = useProjects();
    const [filter, setFilter] = useState("すべて");
    const fetchTodos = async () => {
        const snapshot = await getDocs(collection(db, "tasks"));
        return snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
    };
    const { data: todos = [], isLoading, refetch, } = useQuery({
        queryKey: ["tasks"],
        queryFn: fetchTodos,
        enabled: !!user,
    });
    const addTodo = async ({ title, memo, dueDate, projectId, }) => {
        if (!user)
            return;
        const newTodo = {
            title: title,
            memo: memo,
            status: "未完了",
            dueDate: dueDate ?? undefined,
            isCompleted: false,
            createdAt: new Date().toISOString(),
            projectId: projectId,
            userId: user.uid,
        };
        await addDoc(collection(db, "tasks"), newTodo);
        refetch();
    };
    const toggleTodo = async (id) => {
        const target = todos.find((t) => t.id === id);
        if (!target)
            return;
        const newStatus = target.status === "完了" ? "未完了" : "完了";
        await updateDoc(doc(db, "tasks", id), { status: newStatus });
        refetch();
    };
    const updateStatus = async (id, newStatus) => {
        await updateDoc(doc(db, "tasks", id), { status: newStatus });
        refetch();
    };
    const deleteTodo = async (id) => {
        await deleteDoc(doc(db, "tasks", id));
        refetch();
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
    if (filteredTodos.length === 0)
        return null;
    return (_jsx(_Fragment, { children: projects.map((project) => (_jsxs("div", { className: "mb-8 border p-4 rounded", children: [_jsx("h2", { className: "text-xl font-bold mb-2", children: project.name }), _jsx(TodoTemplate, { todos: filteredTodos.filter((todo) => todo.projectId === project.id), filter: filter, onAddTodo: (todo) => addTodo({ ...todo, projectId: project.id }), onToggle: toggleTodo, onStatusChange: updateStatus, onDelete: deleteTodo, onFilterChange: setFilter })] }, project.id))) }));
}
