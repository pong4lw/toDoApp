import { jsx as _jsx } from "react/jsx-runtime";
export function Button({ active, onClick, label }) {
    return (_jsx("button", { onClick: onClick, className: `px-3 py-1 border rounded ${active ? "bg-blue-500 text-white" : "bg-gray-100"}`, children: label }));
}
