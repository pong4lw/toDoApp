import { jsx as _jsx } from "react/jsx-runtime";
export function DeleteButton({ onClick }) {
    return (_jsx("button", { onClick: onClick, className: "text-red-500 hover:text-red-700 transition", "aria-label": "Delete todo", children: "\u2716" }));
}
