import { useEffect, useState } from 'react';
import TodoForm from './TodoForm';
import TodoItem from './TodoItem';

export type TodoStatus = '未完了' | '完了' | '保留' | 'リスケ';

interface Todo {
  id: number;
  text: string;
  status: TodoStatus;
  dueDate?: string;
}

export default function App() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const saved = localStorage.getItem('todos');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('保存データの解析に失敗:', e);
      }
    }
    return [];
  });

  // 2. データ更新時に保存（todosが変わるたび）
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text: string, dueDate?: string) => {
    const newTodo: Todo = {
      id: Date.now(),
      text,
      status: '未完了',
      dueDate,
    };
    setTodos((prev) => [...prev, newTodo]);
  };

  // 完了/未完了をトグル
  const toggleTodo = (id: number) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              status: todo.status === '完了' ? '未完了' : '完了',
            }
          : todo
      )
    );
  };

  // 状態更新（ステータス変更）
  const updateStatus = (id: number, newStatus: TodoStatus) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, status: newStatus } : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const [filter, setFilter] = useState<'すべて' | '未完了' | '完了' | '保留' | 'リスケ'>('すべて');

  const sortedTodos = [...todos].sort((a, b) => {
    if (a.dueDate && b.dueDate) {
      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    }
    if (a.dueDate && !b.dueDate) return -1;
    if (!a.dueDate && b.dueDate) return 1;
    return 0;
  });

  const filteredTodos = sortedTodos.filter((todo) =>
    filter === 'すべて' ? true : todo.status === filter
  );

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow rounded">
      <h1 className="text-3xl font-bold mb-6 text-center">TODO アプリ</h1>
      <TodoForm onAddTodo={addTodo} />

<div className="flex justify-center gap-2 mb-4">
  {['すべて', '未完了', '完了', '保留', 'リスケ'].map((f) => (
    <button
      key={f}
      onClick={() => setFilter(f as typeof filter)}
      className={`px-3 py-1 border rounded ${
        filter === f ? 'bg-blue-500 text-white' : 'bg-gray-100'
      }`}
    >
      {f}
    </button>
  ))}
</div>

      <ul className="mt-6 space-y-2">
  {filteredTodos.map(({ id, text, status, dueDate }) => (
          <TodoItem
            key={id}
            id={id}
            text={text}
            status={status}
            dueDate={dueDate}
            onToggle={toggleTodo}
            onStatusChange={updateStatus}
            onDelete={deleteTodo}
          />
        ))}
      </ul>
    </div>
  );
}
