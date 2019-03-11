const router = require('express').Router()
const controller = require('../controllers/userController')
const authentication = require('../middleware/authentication')

// register a user
router.post('/register', controller.registerUser)

// login user
router.post('/login', controller.userLogin)

// login google
router.post('/googlelogin', controller.googlelogin)

// logout user
router.get('/logout')

module.exports = router