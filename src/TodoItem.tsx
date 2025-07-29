import { TodoStatus } from './App';

interface TodoItemProps {
  id: number;
  text: string;
  status: TodoStatus;
  dueDate?: string;
  onToggle: (id: number) => void;
  onStatusChange: (id: number, status: TodoStatus) => void;  // ← 追加
  onDelete: (id: number) => void;
}

export default function TodoItem({
  id,
  text,
  status,
  dueDate,
  onToggle,
  onStatusChange,
  onDelete,
}: TodoItemProps) {
  const isCompleted = status === '完了';

  const formattedDateTime = dueDate
    ? new Date(dueDate).toLocaleString(undefined, {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
      })
    : null;

  return (
    <li
      className={`flex flex-col sm:flex-row sm:items-center justify-between py-3 px-4 border rounded-md shadow-sm transition
        ${isCompleted ? 'bg-green-50' : 'bg-white'}`}
    >
      <label className="flex items-center gap-2 cursor-pointer select-none">
        <input
          type="checkbox"
          checked={isCompleted}
          onChange={() => onToggle(id)}
          className="w-5 h-5 text-green-600 rounded border-gray-300 focus:ring-green-500"
        />
        <span
          className={`font-medium ${
            isCompleted ? 'line-through text-green-600' : 'text-gray-800'
          }`}
        >
          {text}
        </span>
      </label>

      <select
        value={status}
        onChange={(e) =>
          onStatusChange(id, e.target.value as TodoStatus)
        }
        className="border border-gray-300 rounded p-1 mt-2 sm:mt-0"
      >
        <option value="未完了">未完了</option>
        <option value="完了">完了</option>
        <option value="保留">保留</option>
        <option value="リスケ">リスケ</option>
      </select>

      <div className="flex items-center gap-4 mt-2 sm:mt-0">
        {formattedDateTime && (
          <time
            className={`text-sm ${
              isCompleted ? 'text-green-500 line-through' : 'text-gray-600'
            }`}
            dateTime={dueDate}
          >
            {formattedDateTime}
          </time>
        )}

        <button
          onClick={() => onDelete(id)}
          className="text-red-500 hover:text-red-700 transition"
          aria-label="Delete todo"
        >
          &#x2716;
        </button>
      </div>
    </li>
  );
}
