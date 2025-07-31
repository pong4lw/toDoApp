// components/TaskModal.tsx
import { useState } from "react";
import DatePicker from "./DatePicker";

export default function TaskModal({
  onClose,
  onSubmit,
}: {
  onClose: () => void;
  onSubmit: (task: any) => void;
}) {
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState<Date | undefined>(undefined);

  const handleSubmit = () => {
    onSubmit({
      title,
      dueDate: dueDate ? dueDate.toISOString() : null,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded w-[90%] max-w-md shadow-lg space-y-4">
        <h2 className="text-xl font-bold">タスクを作成</h2>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 w-full"
          placeholder="タイトルを入力"
        />
        <DatePicker selected={dueDate} onSelect={setDueDate} />
        <div className="flex justify-end space-x-2">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">
            キャンセル
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            保存
          </button>
        </div>
      </div>
    </div>
  );
}
