const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')

router.get('/data', userController.findAll)
router.post('/datauser', userController.findOne)
router.post('/register', userController.register)
router.post('/login', userController.login)
router.put('/update/:id', userController.update)
router.delete('/delete/:id', userController.delete)

module.exports = router