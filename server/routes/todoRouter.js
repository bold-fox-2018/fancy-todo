const router = require('express').Router()
const todoController = require('../controllers/todoController')


router.get('/data', todoController.findAll)
router.post('/create', todoController.create)
router.put('/update/:id', todoController.update)
router.delete('/delete/:id', todoController.delete)

module.exports = router