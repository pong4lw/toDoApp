import { jsx as _jsx } from "react/jsx-runtime";
// src/components/LogoutButton.tsx
import { signOut } from "firebase/auth";
import { auth } from "@/firebase";
export const LogoutButton = () => {
    const handleLogout = async () => {
        await signOut(auth);
        alert("ログアウトしました");
    };
    return _jsx("button", { onClick: handleLogout, children: "\u30ED\u30B0\u30A2\u30A6\u30C8" });
};
