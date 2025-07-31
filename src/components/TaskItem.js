import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export default function TaskItem({ task }) {
    const formattedDate = task.dueDate
        ? new Date(task.dueDate).toLocaleDateString()
        : "未設定";
    return (_jsxs("div", { className: "p-2 border rounded mb-2", children: [_jsx("p", { className: "font-bold", children: task.title }), _jsxs("p", { className: "text-sm text-gray-600", children: ["\u671F\u65E5: ", formattedDate] })] }));
}
