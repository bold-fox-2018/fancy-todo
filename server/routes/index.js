var express = require('express')
const router = express()
const controllers = require('../controllers/')

router.get('/',controllers.homePage)
router.post('/signin',controllers.signIn)
router.post('/signup',controllers.signUp)

module.exports = router;
