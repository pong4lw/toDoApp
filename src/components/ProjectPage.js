import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { TaskContainer } from "@/components/TaskContainer";
export default function ProjectPage() {
    const selectedProjectId = "your-project-id"; // 動的に取得可能にする
    return (_jsxs("div", { className: "max-w-xl mx-auto mt-10", children: [_jsx("h1", { className: "text-xl font-bold mb-4", children: "\u30BF\u30B9\u30AF\u7BA1\u7406" }), _jsx(TaskContainer, { projectId: selectedProjectId })] }));
}
