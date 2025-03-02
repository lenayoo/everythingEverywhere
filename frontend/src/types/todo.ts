export interface Todo {
  id: number;
  date: string;
  todo: string;
  checked: boolean;
}

export interface EditTodo {
  todo: string;
  checked: boolean;
}
