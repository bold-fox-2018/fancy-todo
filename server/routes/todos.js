const router = require('express').Router()
const controller = require('../controllers/todoController')
const authentication = require('../middlewares/authentication')
// const taskAuthorization = require('../middlewares/otorisasi').taskAuthorization

//todos
router.get('/', controller.todolist)
router.post('/', controller.addTodo)
router.get('/:id', controller.findTodo)
router.patch('/:id', controller.update)
router.delete('/:id', controller.delete)

module.exports = router