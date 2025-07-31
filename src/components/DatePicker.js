import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
// components/DatePicker.tsx
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
export default function DatePicker({ selected, onSelect }) {
    return (_jsx(DayPicker, { mode: "single", selected: selected, onSelect: onSelect, footer: selected ? (_jsxs("p", { children: ["\u9078\u629E\u65E5: ", selected.toLocaleDateString()] })) : (_jsx("p", { children: "\u65E5\u4ED8\u3092\u9078\u3093\u3067\u304F\u3060\u3055\u3044" })) }));
}
