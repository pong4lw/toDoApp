import { jsx as _jsx } from "react/jsx-runtime";
export function DateInput({ value, onChange }) {
    return (_jsx("input", { type: "date", value: value, onChange: onChange, className: "p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" }));
}
