const express = require('express')
const router = express.Router()
const userController = require('../controllers/user')
const authenticate = require('../middlewares/authenticate')

router.post('/signUp', userController.signUp)

router.post('/signIn', userController.signIn)

router.post('/googleSignIn', userController.googleSignIn)

router.use(authenticate)

router.get('/tokenProfile', userController.tokenProfile)

module.exports = router
