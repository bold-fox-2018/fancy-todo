const express = require('express'),
      router = express.Router(),
      { googleAuth } = require("../middlewares/authentication"),
      { signup, login, update, googleSignUp } = require('../controllers/users');

router
    .post('/register',signup)
    .post('/login',login)
    .post('/google-signin',googleAuth, googleSignUp)
    .put('/update',update)

module.exports = router;