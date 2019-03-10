const todo = require('express').Router();
const { TodoController } = require('../controllers');
const { auth } = require('../middlewares/jwt')
todo
  .use('/', auth)
  .get('/user', TodoController.findOneByUser)
  .get('/', TodoController.findAll)
  .get('/:id', TodoController.findOne)
  .post('/', TodoController.create)
  .put('/:id', TodoController.update)
  .delete('/:id', TodoController.delete)

module.exports = todo;