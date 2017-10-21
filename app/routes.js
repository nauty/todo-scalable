var express = require('express');
var router = express.Router();
var cntr = require('./controllers/todoController');

  // router.get('/api/todos', cntr.getTodos);
  router.get('/api/todos/:list_id', cntr.getTodos);
  router.get('/api/lists', cntr.getLists);

  router.post('/api/todos',cntr.addTodos);
  router.post('/api/list',cntr.addList);


  router.delete('/api/todos/:list_id/:todo_id',cntr.deleteTodo);






  module.exports = router;