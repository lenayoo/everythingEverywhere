import { useEffect, useState } from 'react';
import './style.css';
import { getTodos, postTodo, updateTodo, deleteTodo } from '../apis/todo_api';
import { Todo } from '../types/todo';
import axios from 'axios';

export const TodoList = () => {
  const today = new Date().toISOString().split('T')[0];
  const [newTodo, setNewTodo] = useState<string>('');
  const [list, setList] = useState<Todo[]>([]);
  const [editId, setEditId] = useState<number | null>(null);
  const [editTodo, setEditTodo] = useState<string>('');

  useEffect(() => {
    const fetchTodos = async () => {
      const data = await getTodos();
      setList(data);
    };
    fetchTodos();
  }, []);

  const addTodoHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodo(e.target.value);
  };

  const submitTodoHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (newTodo.trim() === '') return;

    const todoData = { date: today, todo: newTodo, checked: false };
    const createdTodo = await postTodo(todoData);
    console.log('🌟', createdTodo);

    setList([...list, createdTodo]);
    setNewTodo('');
  };

  const checkHandler = async (id: number) => {
    const updatedList = list.map((todo) =>
      todo.id == id ? { ...todo, checked: !todo.checked } : todo
    );
    setList(updatedList);
  };

  const deleteTodoHandler = async (id: number) => {
    try {
      await deleteTodo(id);
      const updatedList = list.filter((todo) => todo.id != id);
      setList(updatedList);
    } catch (error) {
      console.log(error);
    }
  };

  const openEditTodo = async (id: number) => {
    setEditId(id);
  };

  const editTodoChangeHandler = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setEditTodo(e.target.value);
  };
  const submitEditTodoHandler = async (
    e: React.FormEvent<HTMLFormElement>,
    id: number
  ) => {
    e.preventDefault();

    if (editTodo.trim() === '') return;

    const editedData = { todo: editTodo, checked: false };

    try {
      const editedTodo = await updateTodo(id, editedData);
      setList((prevList) =>
        prevList.map((todo) => (todo.id === id ? editedTodo : todo))
      );
      console.log('🍋', list);
      setEditId(null);
    } catch (e) {
      if (axios.isAxiosError(e)) {
        console.error('🚨 Axios 오류:', e.response?.status, e.response?.data);
      } else {
        console.error('🚨 알 수 없는 오류:', e);
      }
      throw e; // 오류를 다시 던져서 프론트에서도 처리 가능하게 함
    }
  };

  return (
    <div className='todo-main'>
      <div>{today}</div>
      <form className='form' onSubmit={submitTodoHandler}>
        <label htmlFor='todo'>What is your today's todo list?</label>
        <div className='add-todo'>
          <input type='text' onChange={addTodoHandler} value={newTodo} />
          <button type='submit'>저장</button>
        </div>
      </form>
      <div className='todo-list'>
        {list ? (
          <ul>
            {list.map((todo, index) => (
              <>
                <li key={index}>
                  {todo.id == editId ? (
                    <>
                      <form onSubmit={(e) => submitEditTodoHandler(e, todo.id)}>
                        <input
                          type='text'
                          onChange={editTodoChangeHandler}
                          value={editTodo}
                        />
                        <button type='submit'>수정</button>
                      </form>
                    </>
                  ) : (
                    <>
                      {todo.todo}
                      <input
                        type='checkbox'
                        checked={todo.checked}
                        onChange={() => checkHandler(todo.id)}
                      />
                      <button onClick={() => openEditTodo(todo.id)}>
                        edit
                      </button>
                      <button onClick={() => deleteTodoHandler(todo.id)}>
                        delete
                      </button>
                    </>
                  )}
                </li>
              </>
            ))}
          </ul>
        ) : (
          ''
        )}
      </div>
    </div>
  );
};
