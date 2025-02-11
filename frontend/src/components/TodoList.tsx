import { useEffect, useState } from 'react';
import './style.css';
import { getTodos, postTodo, updateTodo, deleteTodo } from '../apis/todo_api';
import { Todo } from '../types/todo';

export const TodoList = () => {
  const today = new Date().toISOString().split('T')[0];
  const [newTodo, setNewTodo] = useState<string>('');
  const [list, setList] = useState<Todo[]>([]);

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

    setList([...list, createdTodo]);
    setNewTodo('');
  };

  const checkHandler = async (id: number) => {
    const updatedList = list.map((todo) =>
      todo.id == id ? { ...todo, checked: !todo.checked } : todo
    );
    setList(updatedList);
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
                  {todo.todo}
                  <input
                    type='checkbox'
                    checked={todo.checked}
                    onChange={() => checkHandler(todo.id)}
                  />
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
