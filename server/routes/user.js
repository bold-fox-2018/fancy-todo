const router = require('express').Router()
const userController = require('../controllers/userController')

//get all users data
router.get('/', userController.findAll)

//register new user
router.post('/register', userController.register)

//login a user
router.post('/login', userController.login)

module.exports = router