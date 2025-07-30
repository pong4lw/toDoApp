import { jsx as _jsx } from "react/jsx-runtime";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "@/hooks/useAuth";
import AppContent from "@/AppContent";
const queryClient = new QueryClient();
export default function App() {
    return (_jsx(QueryClientProvider, { client: queryClient, children: _jsx(AuthProvider, { children: _jsx(AppContent, {}) }) }));
}
