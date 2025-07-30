import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Checkbox } from "../atoms/Checkbox";
import { StatusSelect } from "../atoms/StatusSelect";
import { DeleteButton } from "../atoms/DeleteButton";
import { DueDateLabel } from "../atoms/DueDateLabel";
import { TodoLabel } from "../molecules/TodoLabel";
export default function TodoItem({ id, memo, status, dueDate, onToggle, onStatusChange, projectId, onDelete, }) {
    const isCompleted = status === "完了";
    return (_jsxs("li", { className: `flex flex-col sm:flex-row sm:items-center justify-between py-3 px-4 border rounded-md shadow-sm transition
        ${isCompleted ? "bg-green-50" : "bg-white"}`, children: [_jsxs("label", { className: "flex items-center gap-2 cursor-pointer select-none", children: [_jsx(Checkbox, { checked: isCompleted, onChange: () => onToggle(id) }), _jsx(TodoLabel, { memo: memo, isCompleted: isCompleted })] }), _jsx(StatusSelect, { value: status, onChange: (newStatus) => onStatusChange(id, newStatus) }), _jsxs("div", { className: "flex items-center gap-4 mt-2 sm:mt-0", children: [_jsx(DueDateLabel, { dueDate: dueDate ?? undefined, isCompleted: isCompleted }), _jsx(DeleteButton, { onClick: () => onDelete(id) })] })] }));
}
