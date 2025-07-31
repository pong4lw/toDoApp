import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc, query, where, } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { TaskForm } from "@/components/TaskForm";
import { TaskList } from "@/components/TaskList";
export const TaskContainer = ({ projectId }) => {
    const [tasks, setTasks] = useState([]);
    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const q = query(collection(db, "tasks"), where("projectId", "==", projectId));
                const snapshot = await getDocs(q);
                console.log("Snapshot size:", snapshot.size);
                const fetched = snapshot.docs.map((doc) => ({
                    ...doc.data(),
                    id: doc.id,
                }));
                setTasks(fetched);
            }
            catch (error) {
                console.error("Error fetching tasks:", error);
            }
        };
        fetchTasks();
    }, [projectId]);
    const addTask = async (todo) => {
        const newTask = {
            title: todo.title,
            status: "未完了",
            createdAt: new Date().toISOString(),
            projectId, // ここは適宜定義済み変数を使ってください
        };
        const docRef = await addDoc(collection(db, "tasks"), newTask);
        setTasks((prev) => [
            ...prev,
            {
                ...newTask,
                id: docRef.id,
                status: newTask.status,
            },
        ]);
    };
    const toggleTask = async (id) => {
        const target = tasks.find((t) => t.id === id);
        if (!target)
            return;
        const newStatus = target.status === "完了" ? "未完了" : "完了";
        await updateDoc(doc(db, "tasks", id), { status: newStatus });
        setTasks((prev) => prev.map((task) => task.id === id ? { ...task, status: newStatus } : task));
    };
    const deleteTask = async (id) => {
        await deleteDoc(doc(db, "tasks", id));
        setTasks((prev) => prev.filter((task) => task.id !== id));
    };
    return (_jsxs("div", { children: [_jsx(TaskForm, { onSubmit: addTask }), _jsx(TaskList, { tasks: tasks, onToggle: toggleTask, onDelete: deleteTask })] }));
};
