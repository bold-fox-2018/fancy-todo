const signin = require('express').Router();
const { UserCOntroller } = require('../controllers');

signin
  .post('/local', UserCOntroller.signInLocal)
  .post('/google', UserCOntroller.signInGoogle)

module.exports = signin;