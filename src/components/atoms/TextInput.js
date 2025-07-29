import { jsx as _jsx } from "react/jsx-runtime";
export function TextInput({ value, onChange, placeholder }) {
    return (_jsx("input", { type: "text", value: value, onChange: onChange, placeholder: placeholder, className: "flex-grow p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-[200px]" }));
}
