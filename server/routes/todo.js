const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');

router.post('/todo/new', async (req, res) => {
  const text = req.body.text;
  console.log(text);
  
  const newTodo = new Todo({
    text: text
  });
  await newTodo.save();
  // res.status(200).send('Error fetching todos');
  res.json(newTodo);
});

router.get('/todo/:id', async (req, res) => {
  const todo = await Todo.findById(req.params.id);

  res.json(todo);
});

router.put('/todo/edit/:id', async (req, res) => {
  const todo = await Todo.findById(req.params.id);

  todo.text = req.body.text;
  todo.description = req.body.description

  todo.save();

  res.json(todo);
});

router.put('/todo/complete/:id', async (req, res) => {
  const todo = await Todo.findById(req.params.id);

  todo.complete = !todo.complete;
  // todo.complete = req.body.complete;

  todo.save();

  res.json(todo);
});

router.delete('/todo/delete/:id', async (req, res) => {
  const result = await Todo.findByIdAndDelete(req.params.id);

  res.json(result);
});


module.exports = router;
