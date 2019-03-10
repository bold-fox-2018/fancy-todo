const router = require('express').Router()
const userController = require('../controllers/user')
const Authentication = require('../middlewares/authentication')

router.post('/register', userController.register)
router.post('/login', userController.login)
router.post('/googleauth', userController.authGoogle)
router.get('/', Authentication, userController.findAll)

module.exports = router