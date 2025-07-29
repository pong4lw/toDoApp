// src/types.ts

export type TodoStatus = "未完了" | "完了" | "保留" | "リスケ";

export interface Todo {
  id: number;
  text: string;
  status: TodoStatus;
  dueDate?: string;
}

export type FilterType = TodoStatus | "すべて";
