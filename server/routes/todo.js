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

// router.get('/:id', async (req, res) => {
//   const id = req.params.id;

//   const todo = await Todo.findById(id);

//   if (todo) {
//     res.json(todo);
//   } else {
//     res.status(404).send('Todo not found');
//   }
// });

router.delete('/todo/delete/:id', async (req, res) => {
  const result = await Todo.findByIdAndDelete(req.params.id);

  res.json(result);
});

router.put('/todo/complete/:id', async (req, res) => {
  const todo = await Todo.findById(req.params.id);

  todo.complete = !todo.complete;

  todo.save();

  res.json(todo);
});

module.exports = router;
