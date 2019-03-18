const router = require('express').Router()
const GoogleController = require('../controllers/GoogleController')

router.post('/tokensignin', GoogleController.login)

module.exports = router