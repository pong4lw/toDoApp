import { jsx as _jsx } from "react/jsx-runtime";
export function SubmitButton({ label }) {
    return (_jsx("button", { type: "submit", className: "px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition", children: label }));
}
