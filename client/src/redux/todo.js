import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';

const getTodos = createAsyncThunk('getTodos', async () => {
  const res = await fetch('http://localhost:5000/todos');
  const jsonData = await res.json();
  return jsonData.rows;
});

const deleteTodo = createAsyncThunk('deleteTodo', async (id) => {
  const todoToDelete = await fetch(`http://localhost:5000/todos/${id}`, {
    method: 'DELETE',
  });
  return id;
});

const createTodo = createAsyncThunk('createTodo', async (todo) => {
  let newTodo;
  const res = await fetch('http://localhost:5000/todos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(todo),
  })
    .then((res) => res.json())
    .then((data) => {
      newTodo = data;
    });
  return newTodo;
});

export const todoSlice = createSlice({
  name: 'todos',
  initialState: {
    todosList: [],
    isLoading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTodos.fulfilled, (state, action) => {
      state.isLoading = false;
      state.todosList = action.payload;
    });
    builder.addCase(getTodos.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(deleteTodo.fulfilled, (state, action) => {
      state.todosList = state.todosList.filter((todo) => todo.todo_id !== action.payload);
    });

    builder.addCase(createTodo.fulfilled, (state, action) => {
      console.log(action.payload);
      state.todosList.push(action.payload);
    });
  },
});

export { getTodos, deleteTodo, createTodo };
export const selectIsLoading = (state) => state.todos.isLoading;
export const selectTodosList = (state) => state.todos.todosList;
export default todoSlice.reducer;
