const signin = require('express').Router();
const { UserCOntroller } = require('../controllers');

signin
  .post('/local', UserCOntroller.signInLocal)

module.exports = signin;