const Route = require('route-label')(require('express')()),
    userController = require('../controllers/userController');

Route.post('Form_SignIn', '/formSignIn', userController.formSignIn);
Route.post('Google_SignIn', '/googleSignIn', userController.googleSignIn);

module.exports = Route;