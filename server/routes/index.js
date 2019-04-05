var express = require('express')
const router = express()
const {UserController,ToDoController} = require('../controllers/')

// user route
router.get('/',UserController.homePage)
router.post('/user/signin',UserController.signIn)
router.post('/user/signup',UserController.signUp)
router.post('/user/Gsignin',UserController.Gsignin)

// todo route
router.get('/todo',ToDoController.read)
router.post('/todo/create',ToDoController.create)
router.put('/todo/update',ToDoController.update)
router.delete('/todo/delete',ToDoController.delete)

module.exports = router;
