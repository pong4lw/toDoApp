import { Task, TodoStatus } from "@/types";

type Props = {
  tasks: Task[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
};

export const TaskList = ({ tasks, onToggle, onDelete }: Props) => {
  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id} className="flex items-center justify-between mb-2">
          <div
            className={`cursor-pointer ${task.status === "完了" ? "line-through text-gray-500" : ""}`}
            onClick={() => onToggle(task.id)}
          >
            {task.title}
          </div>
          <button
            className="text-red-500 hover:underline ml-2"
            onClick={() => onDelete(task.id)}
          >
            削除
          </button>
        </li>
      ))}
    </ul>
  );
};
