import { TaskContainer } from "@/components/TaskContainer";

export default function ProjectPage() {
  const selectedProjectId = "your-project-id"; // 動的に取得可能にする

  return (
    <div className="max-w-xl mx-auto mt-10">
      <h1 className="text-xl font-bold mb-4">タスク管理</h1>
      <TaskContainer projectId={selectedProjectId} />
    </div>
  );
}
