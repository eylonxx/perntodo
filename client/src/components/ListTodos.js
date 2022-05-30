import React, { useEffect, useState } from 'react';

export default function ListTodos() {
  const [todos, setTodos] = useState([]);

  const getTodos = async () => {
    const res = await fetch('http://localhost:5000/todos');
    const jsonData = await res.json();
    setTodos(jsonData.rows);
  };

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <div>
      <ul>
        {todos.map((todo) => (
          <li>{todo.description}</li>
        ))}
      </ul>
    </div>
  );
}
