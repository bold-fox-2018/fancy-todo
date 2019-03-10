const user = require('express').Router();
const { UserCOntroller } = require('../controllers');

user
  .get('/', UserCOntroller.findAll)
  .get('/:id', UserCOntroller.findOne)
  .post('/', UserCOntroller.register)

module.exports = user;