var express = require('express');
var router = express.Router();
const Todo = require('../models/Todo');

/* GET home page. */
router.get('/', async (req, res) => {
  try {
    const todos = await Todo.find();

    res.render('all', { todos });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching todos');
  }
});

module.exports = router;