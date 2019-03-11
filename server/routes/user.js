const express = require('express')
const router = express.Router()
const userController = require('../controller/userController')
const googleController = require('../controller/googleController')
const todoController = require('../controller/todoController')
const projectController = require('../controller/projectController')


const access = require('../middlewares/access')
const isAdmin = require('../middlewares/admin')
const postToGoogleCalendar = require('../middlewares/postToGoogleCalendar')

router.post('/fancytodo', userController.create)
router.post('/signin',userController.login)
router.post('/login/google',googleController.signin)
router.post('/fancytodo/todo',access, postToGoogleCalendar, todoController.create)
router.post('/verify', googleController.tokenVerification)
router.post('/projectTodo',access, projectController.create)

router.get('/fancytodo',access, userController.findAll)

router.get('/fancytodo/:email', userController.findOne)

router.get('/projectTodo/:email',access, projectController.findWhere)
router.get('/projectTodoList/:id',access, projectController.getProjectTodo)

router.patch('/fancytodo/:id',access, todoController.update)
router.patch('/projectTodo/:id',access,projectController.addMember)

router.delete('/fancytodo/:id', access, todoController.delete)
router.delete('/project/:id',access,isAdmin, projectController.delete)


module.exports = router