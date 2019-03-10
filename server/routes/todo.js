const express = require('express')
const router = express.Router()
const todoController = require('../controllers/todo')
const authenticate = require('../middlewares/authenticate')

router.use(authenticate)

router.get('/list', todoController.listTodo)

router.post('/new', todoController.newTodo)

router.put('/update', todoController.updateTodo)

router.delete('/delete', todoController.deleteTodo)

router.get('/video', todoController.getVideo)

module.exports = router
