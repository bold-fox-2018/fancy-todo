const router = require('express').Router()
const users = require('./users')
const todos = require('./todos')
const projects = require('./projects')
const userController = require('../controllers/userController')
const isLogin = require('../middlewares/authentication')

router.post('/login', userController.login)
router.post('/signup', userController.register)
router.use('/users', users)
router.use(isLogin) //middleware
router.use('/todos', todos)
router.use('/projects', projects)

module.exports = router