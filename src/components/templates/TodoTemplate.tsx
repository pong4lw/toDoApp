import { Todo, TodoStatus } from "@/types";
import TodoForm from "@/components/molecules/TodoForm";
import TodoList from "@/components/organisms/TodoList";
import { Button } from "@/components/atoms/Button";

type FilterType = "未完了" | "完了" | "保留" | "リスケ" | "すべて";

interface TodoTemplateProps {
  todos: Todo[];
  filter: FilterType;
  onAddTodo: (text: string, dueDate?: string) => void;
  onToggle: (id: string) => void;
  onStatusChange: (id: string, status: TodoStatus) => void;
  onDelete: (id: string) => void;
  onFilterChange: (filter: FilterType) => void;
}

export function TodoTemplate({
  todos,
  filter,
  onAddTodo,
  onToggle,
  onStatusChange,
  onDelete,
  onFilterChange,
}: TodoTemplateProps) {
  const filters: FilterType[] = ["すべて", "未完了", "完了", "保留", "リスケ"];

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow rounded">
      <h1 className="text-3xl font-bold mb-6 text-center">TODO アプリ</h1>
      <TodoForm onAddTodo={onAddTodo} />
      <div className="flex justify-center gap-2 mb-4">
        {filters.map((f) => (
          <Button
            key={f}
            label={f}
            active={filter === f}
            onClick={() => onFilterChange(f)}
          />
        ))}
      </div>
      <TodoList
        todos={todos}
        onToggle={onToggle}
        onStatusChange={onStatusChange}
        onDelete={onDelete}
      />
    </div>
  );
}
