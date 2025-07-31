import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export const TaskList = ({ tasks, onToggle, onDelete }) => {
    return (_jsx("ul", { children: tasks.map((task) => (_jsxs("li", { className: "flex items-center justify-between mb-2", children: [_jsx("div", { className: `cursor-pointer ${task.status === "完了" ? "line-through text-gray-500" : ""}`, onClick: () => onToggle(task.id), children: task.title }), _jsx("button", { className: "text-red-500 hover:underline ml-2", onClick: () => onDelete(task.id), children: "\u524A\u9664" })] }, task.id))) }));
};
