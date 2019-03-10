const router = require('express').Router();
const todo = require('./todo');
const user = require('./user');
const signin = require('./signin');

router
  .use('/signin', signin)
  .use('/todo', todo)
  .use('/user', user)

module.exports = router;