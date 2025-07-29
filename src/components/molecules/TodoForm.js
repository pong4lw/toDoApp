import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { TextInput } from "../atoms/TextInput";
import { DateInput } from "../atoms/DateInput";
import { TimeInput } from "../atoms/TimeInput";
import { SubmitButton } from "../atoms/SubmitButton";
export default function TodoForm({ onAddTodo }) {
    const [text, setText] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const handleSubmit = (e) => {
        e.preventDefault();
        const trimmed = text.trim();
        if (!trimmed)
            return;
        let dueDate = undefined;
        if (date) {
            dueDate = time ? `${date}T${time}` : `${date}T00:00`;
        }
        onAddTodo(trimmed, dueDate);
        setText("");
        setDate("");
        setTime("");
    };
    return (_jsxs("form", { onSubmit: handleSubmit, className: "flex flex-wrap gap-2 mt-4", children: [_jsx(TextInput, { value: text, onChange: (e) => setText(e.target.value), placeholder: "\u3084\u308B\u3053\u3068\u3092\u5165\u529B..." }), _jsx(DateInput, { value: date, onChange: (e) => setDate(e.target.value) }), _jsx(TimeInput, { value: time, onChange: (e) => setTime(e.target.value) }), _jsx(SubmitButton, { label: "\u8FFD\u52A0" })] }));
}
