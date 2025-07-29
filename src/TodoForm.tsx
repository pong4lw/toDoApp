import { useState, FormEvent } from 'react';

interface TodoFormProps {
  onAddTodo: (text: string, dueDate?: string) => void;
}

export default function TodoForm({ onAddTodo }: TodoFormProps) {
  const [text, setText] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;

    let dueDate: string | undefined = undefined;
    if (date) {
      dueDate = time ? `${date}T${time}` : `${date}T00:00`;
    }

    onAddTodo(trimmed, dueDate);
    setText('');
    setDate('');
    setTime('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-wrap gap-2 mt-4">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="やることを入力..."
        className="flex-grow p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-[200px]"
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="time"
        value={time}
        onChange={(e) => setTime(e.target.value)}
        className="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition"
      >
        追加
      </button>
    </form>
  );
}
