// components/TaskItem.tsx
type Task = {
  title: string;
  dueDate?: string; // ISO 文字列で保存されていると仮定
};

export default function TaskItem({ task }: { task: Task }) {
  const formattedDate = task.dueDate
    ? new Date(task.dueDate).toLocaleDateString()
    : "未設定";

  return (
    <div className="p-2 border rounded mb-2">
      <p className="font-bold">{task.title}</p>
      <p className="text-sm text-gray-600">期日: {formattedDate}</p>
    </div>
  );
}
