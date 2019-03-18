const router = require('express').Router()
const TodoController = require('../controllers/TodoController')
// const authenticate = require('../middlewares/authenticate')

router.get('/list', TodoController.findAll )

router.get('/list/find', TodoController.findOne)

router.post('/list/create', TodoController.create)

router.put('/list/edit/:id',  TodoController.update)

router.delete('/list/delete/:id', TodoController.delete)

module.exports = router