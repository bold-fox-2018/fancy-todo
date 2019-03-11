const router = require('express').Router()
const todoController = require('../controllers/todo')
const Authentication = require('../middlewares/authentication')
const Authorization = require('../middlewares/authorization')

router.use(Authentication)

router.post('/', todoController.create)
router.get('/', todoController.findAll)
router.get('/:id', todoController.findOne)
router.put('/:id', todoController.update)
router.delete('/:id', todoController.delete)

module.exports = router