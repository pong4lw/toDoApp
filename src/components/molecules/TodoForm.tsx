import React from "react";
import { useState, FormEvent } from "react";
import { TextInput } from "../atoms/TextInput";
import { DateInput } from "../atoms/DateInput";
import { TimeInput } from "../atoms/TimeInput";
import { SubmitButton } from "../atoms/SubmitButton";

interface TodoFormProps {
  onAddTodo: (todo: { title: string; memo?: string; dueDate?: string }) => void;
}

export default function TodoForm({ onAddTodo }: TodoFormProps) {
  const [text, setText] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;

    let dueDate: string | undefined = undefined;
    if (date) {
      dueDate = time ? `${date}T${time}` : `${date}T00:00`;
    }
    onAddTodo({
  title: text, 
  memo: "",
  dueDate,
});

    setText("");
    setDate("");
    setTime("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-wrap gap-2 mt-4">
      <TextInput
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="やることを入力..."
      />
      <DateInput value={date} onChange={(e) => setDate(e.target.value)} />
      <TimeInput value={time} onChange={(e) => setTime(e.target.value)} />
      <SubmitButton label="追加" />
    </form>
  );
}
