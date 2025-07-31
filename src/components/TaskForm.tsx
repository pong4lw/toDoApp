import { DayPicker } from "react-day-picker";
import { useState } from "react";
import "react-day-picker/dist/style.css";
import { useForm } from "react-hook-form";

type Props = {
  onSubmit: (todo: { title: string; dueDate: Date | null }) => void;
};

export const TaskForm = ({ onSubmit }: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<{ title: string }>();

  const [dueDate, setDueDate] = useState<Date | null>(null);

  const submit = (data: { title: string }) => {
    onSubmit({ title: data.title, dueDate });
    reset();
    setDueDate(null);
  };

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-col gap-2 mb-4">
      <input
        {...register("title", { required: "タイトルは必須です" })}
        placeholder="タスク名"
        className="border px-2 py-1"
      />
      {errors.title && <p className="text-red-500">{errors.title.message}</p>}

      <div>
        <label className="block mb-1 font-semibold">期日を選択:</label>
        <DayPicker
          mode="single"
          selected={dueDate ?? undefined}
          onSelect={(date) => setDueDate(date ?? null)}
          required={false}
        />
      </div>

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-1 rounded self-start"
      >
        追加
      </button>
    </form>
  );
};
