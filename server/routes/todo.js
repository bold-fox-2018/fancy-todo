const router = require('express').Router()
const todoController = require('../controllers/todoController')

// get all todos data
router.get('/', todoController.findAll)

//get one todo data
router.get('/findOne', todoController.findOne)

// create new todo
router.post('/', todoController.createTodo)

//update todo
router.put('/', todoController.updateTodo)

//delete todo
router.delete('/', todoController.deleteTodo)

module.exports = router