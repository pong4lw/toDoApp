// src/types.ts

export type TodoStatus = "未完了" | "完了" | "保留" | "リスケ";

export interface Todo {
  id: string;
  text: string;
  status: TodoStatus;
  dueDate?: string | null;
  createdAt?: string;
}

export type FilterType = TodoStatus | "すべて";
