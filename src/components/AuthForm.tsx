/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/AuthForm.tsx
import React from "react";
import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "@/firebase";

export const AuthForm = () => {
  const [isNewUser, setIsNewUser] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleAuth = async () => {
    try {
      if (isNewUser) {
        await createUserWithEmailAndPassword(auth, email, password);
        alert("登録完了");
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        alert("ログイン成功");
      }
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <div>
      <h2>{isNewUser ? "新規登録" : "ログイン"}</h2>
      <input
        type="email"
        placeholder="メールアドレス"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />
      <input
        type="password"
        placeholder="パスワード"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <button onClick={handleAuth}>{isNewUser ? "登録" : "ログイン"}</button>
      <p onClick={() => setIsNewUser(!isNewUser)} style={{ cursor: "pointer" }}>
        {isNewUser ? "ログインはこちら" : "新規登録はこちら"}
      </p>
    </div>
  );
};
