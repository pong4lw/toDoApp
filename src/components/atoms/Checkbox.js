import { jsx as _jsx } from "react/jsx-runtime";
export function Checkbox({ checked, onChange }) {
    return (_jsx("input", { type: "checkbox", checked: checked, onChange: onChange, className: "w-5 h-5 text-green-600 rounded border-gray-300 focus:ring-green-500" }));
}
