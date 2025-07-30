// hooks/useProjects.ts
import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/firebase";
import { useAuth } from "@/hooks/useAuth";

type Project = {
  id: string;
  name: string;
  ownerId: string;
};

export function useProjects() {
  const user = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetch = async () => {
      try {
        const q = query(collection(db, "projects"), where("ownerId", "==", user.uid));
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map(doc => ({
          id: doc.id,
          ...(doc.data() as Omit<Project, "id">),
        }));
        setProjects(data);
      } catch (err) {
        console.error("プロジェクト取得エラー:", err);
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, [user]);

  return { projects, loading };
}
