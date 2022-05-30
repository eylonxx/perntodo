import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTodo, getTodos, selectIsLoading, selectTodosList } from '../redux/todo';

export default function ListTodos() {
  const todosList = useSelector(selectTodosList);
  const isLoading = useSelector(selectIsLoading);
  const dispatch = useDispatch();

  const handleGetTodos = async () => {
    try {
      dispatch(getTodos());
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      dispatch(deleteTodo(id));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleGetTodos();
  }, []);

  return (
    <div>
      {isLoading ? (
        'loading'
      ) : (
        <ul>
          {todosList.map((todo) => (
            <li key={todo.todo_id}>
              <p>{todo.description}</p>
              <button onClick={() => handleDelete(todo.todo_id)}>X</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
