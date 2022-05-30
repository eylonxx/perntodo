import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createTodo } from '../redux/todo';

export default function InputTodo() {
  const [description, setDescription] = useState('');
  const dispatch = useDispatch();

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { description };
      dispatch(createTodo(body));
      setDescription('');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Write your Todo!</h1>
      <form onSubmit={submitForm}>
        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
        <button>Add</button>
      </form>
    </div>
  );
}
