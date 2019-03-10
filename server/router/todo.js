const router = require('express').Router()
const todoController = require('../controllers/todo')
const Authentication = require('../middlewares/authentication')
const Authorization = require('../middlewares/authorization')

router.use(Authentication)

router.post('/', todoController.create)
router.get('/', todoController.findAll)
router.get('/:id', Authorization, todoController.findOne)
router.put('/:id', Authorization, todoController.update)
router.delete('/:id', Authorization, todoController.delete)

module.exports = router