import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// components/TaskModal.tsx
import { useState } from "react";
import DatePicker from "./DatePicker";
export default function TaskModal({ onClose, onSubmit, }) {
    const [title, setTitle] = useState("");
    const [dueDate, setDueDate] = useState(undefined);
    const handleSubmit = () => {
        onSubmit({
            title,
            dueDate: dueDate ? dueDate.toISOString() : null,
        });
        onClose();
    };
    return (_jsx("div", { className: "fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50", children: _jsxs("div", { className: "bg-white p-6 rounded w-[90%] max-w-md shadow-lg space-y-4", children: [_jsx("h2", { className: "text-xl font-bold", children: "\u30BF\u30B9\u30AF\u3092\u4F5C\u6210" }), _jsx("input", { type: "text", value: title, onChange: (e) => setTitle(e.target.value), className: "border p-2 w-full", placeholder: "\u30BF\u30A4\u30C8\u30EB\u3092\u5165\u529B" }), _jsx(DatePicker, { selected: dueDate, onSelect: setDueDate }), _jsxs("div", { className: "flex justify-end space-x-2", children: [_jsx("button", { onClick: onClose, className: "px-4 py-2 bg-gray-300 rounded", children: "\u30AD\u30E3\u30F3\u30BB\u30EB" }), _jsx("button", { onClick: handleSubmit, className: "px-4 py-2 bg-blue-600 text-white rounded", children: "\u4FDD\u5B58" })] })] }) }));
}
