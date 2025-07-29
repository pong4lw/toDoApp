// src/components/LogoutButton.tsx
import { signOut } from "firebase/auth";
import { auth } from "../lib/firebase";

export const LogoutButton = () => {
  const handleLogout = async () => {
    await signOut(auth);
    alert("ログアウトしました");
  };

  return <button onClick={handleLogout}>ログアウト</button>;
};
