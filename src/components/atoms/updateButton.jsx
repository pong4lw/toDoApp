import React from "react";
import { useQuery, QueryClient, QueryClientProvider } from "@tanstack/react-query";

// ✅ クライアント初期化
const queryClient = new QueryClient();

// ✅ データ取得関数
const fetchTodos = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/todos");
  if (!res.ok) throw new Error("データ取得に失敗しました");
  return res.json();
};

// ✅ Button コンポーネント
function Button() {
  const { data, refetch } = useQuery({
    queryKey: ["todos"],
    queryFn: fetchTodos,
  });

  return (
    <div>
      <button onClick={() => refetch()}>更新</button>
      <ul>
        {data?.slice(0, 5).map((todo: any) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
    </div>
  );
}

// ✅ 全体を QueryClientProvider で囲む
export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Button />
    </QueryClientProvider>
  );
}
