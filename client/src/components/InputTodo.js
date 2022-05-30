import React, { useState } from 'react';

export default function InputTodo() {
  const [description, setDescription] = useState('');

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { description };
      const res = await fetch('http://localhost:5000/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      console.log(res);
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
