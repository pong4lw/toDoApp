import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export function StatusSelect({ value, onChange }) {
    return (_jsxs("select", { value: value, onChange: (e) => onChange(e.target.value), className: "border border-gray-300 rounded p-1 mt-2 sm:mt-0", children: [_jsx("option", { value: "\u672A\u5B8C\u4E86", children: "\u672A\u5B8C\u4E86" }), _jsx("option", { value: "\u5B8C\u4E86", children: "\u5B8C\u4E86" }), _jsx("option", { value: "\u4FDD\u7559", children: "\u4FDD\u7559" }), _jsx("option", { value: "\u30EA\u30B9\u30B1", children: "\u30EA\u30B9\u30B1" })] }));
}
