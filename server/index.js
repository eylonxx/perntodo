const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db');

//middleware
app.use(cors());
app.use(express.json());

//routes

//create a todo
app.post('/todos', async (req, res) => {
  try {
    const { description } = req.body;
    const newTodo = await pool
      .query('INSERT INTO todos (description) VALUES($1) RETURNING *', [description])
      .then((qres) => {
        res.json(qres.rows[0]);
      })
      .catch((e) => console.log(e));
  } catch (err) {
    console.error(err.message);
  }
});
//get all todos
app.get('/todos', async (req, res) => {
  try {
    const todos = await pool.query('SELECT * FROM todos');
    res.json(todos);
  } catch (error) {
    console.log(error);
  }
});

//get one todo
app.get('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await pool.query('SELECT todo_id, description FROM todos WHERE todo_id = $1', [id]);
    res.json(todo);
  } catch (error) {
    console.log(error);
  }
});

//update todo
app.put('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const todoToUpdate = await pool.query('UPDATE todos SET description = $1 WHERE todo_id = $2', [description, id]);
    res.json('updated todo');
  } catch (error) {
    console.log(error);
  }
});

//delete todo
app.delete('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE  FROM todos WHERE todo_id = $1', [id]);
    res.json('deleted todo');
  } catch (error) {
    console.log(error);
  }
});

app.listen(5000, () => console.log('listening on port 5000'));
