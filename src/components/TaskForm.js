import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useForm } from "react-hook-form";
export const TaskForm = ({ onSubmit }) => {
    const { register, handleSubmit, reset, formState: { errors }, } = useForm();
    const submit = (data) => {
        onSubmit(data.title);
        reset(); // 入力クリア
    };
    return (_jsxs("form", { onSubmit: handleSubmit(submit), className: "flex gap-2 mb-4", children: [_jsx("input", { ...register("title", { required: "タイトルは必須です" }), placeholder: "\u30BF\u30B9\u30AF\u540D", className: "border px-2 py-1 flex-1" }), _jsx("button", { type: "submit", className: "bg-blue-500 text-white px-4 py-1 rounded", children: "\u8FFD\u52A0" }), errors.title && _jsx("p", { className: "text-red-500", children: errors.title.message })] }));
};
