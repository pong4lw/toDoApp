import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, } from "firebase/auth";
import { auth } from "@/lib/firebase";
export const AuthForm = () => {
    const [isNewUser, setIsNewUser] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const handleAuth = async () => {
        try {
            if (isNewUser) {
                await createUserWithEmailAndPassword(auth, email, password);
                alert("登録完了");
            }
            else {
                await signInWithEmailAndPassword(auth, email, password);
                alert("ログイン成功");
            }
        }
        catch (err) {
            alert(err.message);
        }
    };
    return (_jsxs("div", { children: [_jsx("h2", { children: isNewUser ? "新規登録" : "ログイン" }), _jsx("input", { type: "email", placeholder: "\u30E1\u30FC\u30EB\u30A2\u30C9\u30EC\u30B9", value: email, onChange: (e) => setEmail(e.target.value) }), _jsx("br", {}), _jsx("input", { type: "password", placeholder: "\u30D1\u30B9\u30EF\u30FC\u30C9", value: password, onChange: (e) => setPassword(e.target.value) }), _jsx("br", {}), _jsx("button", { onClick: handleAuth, children: isNewUser ? "登録" : "ログイン" }), _jsx("p", { onClick: () => setIsNewUser(!isNewUser), style: { cursor: "pointer" }, children: isNewUser ? "ログインはこちら" : "新規登録はこちら" })] }));
};
