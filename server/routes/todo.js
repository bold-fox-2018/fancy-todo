const router = require('express').Router()
const controller = require('../controllers/todo')
const verify = require('../middleware/verify')

router.use('', verify)

router.get('/read', controller.read)

router.post('/create', controller.create)

router.put('/update/:id', controller.update)

router.delete('/delete/:id', controller.remove)

module.exports = router