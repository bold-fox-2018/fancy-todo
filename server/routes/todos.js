const router = require('express').Router()
const controller = require('../controllers/todoController')
const isLogin = require('../middlewares/authentication')
const { taskAuthorization } = require('../middlewares/authorization')

//todos
router.patch('/:id', isLogin, taskAuthorization, controller.update)
router.get('/', isLogin, taskAuthorization, controller.todolist)
router.post('/', isLogin, taskAuthorization, controller.addTodo)
router.get('/:id', isLogin, taskAuthorization, controller.findTodo)
router.delete('/:id', isLogin, taskAuthorization, controller.delete)

module.exports = router