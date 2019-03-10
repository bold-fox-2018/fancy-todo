const todo = require('express').Router();
const { TodoController } = require('../controllers');

todo
  .get('/', TodoController.findAll)
  .get('/:id', TodoController.findOne)
  .post('/', TodoController.create)
  .put('/:id', TodoController.update)

module.exports = todo;