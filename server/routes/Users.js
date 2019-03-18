const router = require('express').Router()
const UserController = require('../controllers/UserController')
const authenticate = require('../middlewares/authenticate')

router.post('/signup', UserController.signup )

router.post('/signin', UserController.signin )

router.get('/logout', UserController.logout)

module.exports = router