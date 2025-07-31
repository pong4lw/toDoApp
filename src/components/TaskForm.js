import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { DayPicker } from "react-day-picker";
import { useState } from "react";
import "react-day-picker/dist/style.css";
import { useForm } from "react-hook-form";
export const TaskForm = ({ onSubmit }) => {
    const { register, handleSubmit, reset, formState: { errors }, } = useForm();
    const [dueDate, setDueDate] = useState(null);
    const submit = (data) => {
        onSubmit(data.title, dueDate);
        reset();
        setDueDate(null);
    };
    return (_jsxs("form", { onSubmit: handleSubmit(submit), className: "flex flex-col gap-2 mb-4", children: [_jsx("input", { ...register("title", { required: "タイトルは必須です" }), placeholder: "\u30BF\u30B9\u30AF\u540D", className: "border px-2 py-1" }), errors.title && _jsx("p", { className: "text-red-500", children: errors.title.message }), _jsxs("div", { children: [_jsx("label", { className: "block mb-1 font-semibold", children: "\u671F\u65E5\u3092\u9078\u629E:" }), _jsx(DayPicker, { mode: "single", selected: dueDate ?? undefined, onSelect: (date) => setDueDate(date ?? null), required: false })] }), _jsx("button", { type: "submit", className: "bg-blue-500 text-white px-4 py-1 rounded self-start", children: "\u8FFD\u52A0" })] }));
};
