const router = require('express').Router();
const todo = require('./todo');
const user = require('./user');

router
  .use('/todo', todo)
  .use('/user', user)

module.exports = router;