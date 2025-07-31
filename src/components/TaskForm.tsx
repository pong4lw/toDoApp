import { useForm } from "react-hook-form";

type Props = {
  onSubmit: (title: string) => void;
};

export const TaskForm = ({ onSubmit }: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<{ title: string }>();

  const submit = (data: { title: string }) => {
    onSubmit(data.title);
    reset(); // 入力クリア
  };

  return (
    <form onSubmit={handleSubmit(submit)} className="flex gap-2 mb-4">
      <input
        {...register("title", { required: "タイトルは必須です" })}
        placeholder="タスク名"
        className="border px-2 py-1 flex-1"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-1 rounded"
      >
        追加
      </button>
      {errors.title && <p className="text-red-500">{errors.title.message}</p>}
    </form>
  );
};
