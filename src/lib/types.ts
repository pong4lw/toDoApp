// src/types.ts

export type TodoStatus = "未完了" | "完了" | "保留" | "リスケ";

export interface Todo {
  id: string;
  title?: string;
  memo?: string;
  status: TodoStatus;
  dueDate?: string | null;
  isCompleted: boolean;
  projectId?: string;
  userId?: string;
  createdAt?: string;
  updatedAt?: string;
}

interface TodoInput {
  title: string;
  memo?: string;
  dueDate?: string;
}

export interface Task {
  id: string;
  title: string;
  status: TodoStatus;
  projectId: string;
  createdAt: string;
}

export type FilterType = TodoStatus | "すべて";
