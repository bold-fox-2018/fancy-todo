const router = require('express').Router()
const controller = require('../controllers/google')

router.post('/login', controller.login)

module.exports = router