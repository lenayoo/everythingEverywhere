import axios from 'axios';
import { Todo, EditTodo } from '../types/todo';

const TODO_API_URL = 'http://localhost:5001/todo';

export const getTodos = async () => {
  const response = await axios.get(TODO_API_URL);
  return response.data;
};

export const postTodo = async (todo: Omit<Todo, 'id'>): Promise<Todo> => {
  const response = await axios.post(TODO_API_URL, todo);
  console.log('🌸post', response.data);
  return response.data;
};

export const updateTodo = async (id: number, editTodo: EditTodo) => {
  console.log('🌸edit', id, editTodo);
  const response = await axios.put(`${TODO_API_URL}/${id}`, editTodo);
  return response.data;
};

export const deleteTodo = async (id: number) => {
  await axios.delete(`${TODO_API_URL}/${id}`);
};
