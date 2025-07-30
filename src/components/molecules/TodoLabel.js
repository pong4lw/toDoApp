import { jsx as _jsx } from "react/jsx-runtime";
export function TodoLabel({ memo, isCompleted }) {
    return (_jsx("span", { className: `font-medium ${isCompleted ? "line-through text-green-600" : "text-gray-800"}`, children: memo }));
}
