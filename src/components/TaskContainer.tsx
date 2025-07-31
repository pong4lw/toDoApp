import { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Task, TodoStatus } from "@/lib/types";
import { TaskForm } from "@/components/TaskForm";
import { TaskList } from "@/components/TaskList";

type Props = {
  projectId: string;
};

export const TaskContainer = ({ projectId }: Props) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const q = query(
          collection(db, "tasks"),
          where("projectId", "==", projectId),
        );
        const snapshot = await getDocs(q);

        console.log("Snapshot size:", snapshot.size);

        const fetched = snapshot.docs.map((doc) => ({
          ...(doc.data() as any),
          id: doc.id,
        }));

        setTasks(fetched);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, [projectId]);

  const addTask = async (todo: { title: string; dueDate: Date | null }) => {
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
        status: newTask.status as TodoStatus,
      },
    ]);
  };

  const toggleTask = async (id: string) => {
    const target = tasks.find((t) => t.id === id);
    if (!target) return;

    const newStatus = target.status === "完了" ? "未完了" : "完了";
    await updateDoc(doc(db, "tasks", id), { status: newStatus });
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, status: newStatus } : task,
      ),
    );
  };

  const deleteTask = async (id: string) => {
    await deleteDoc(doc(db, "tasks", id));
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  return (
    <div>
      <TaskForm onSubmit={addTask} />
      <TaskList tasks={tasks} onToggle={toggleTask} onDelete={deleteTask} />
    </div>
  );
};
