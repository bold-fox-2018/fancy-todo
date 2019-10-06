const router = require('express').Router()
const controller = require('../controllers/projectController')
const { projectAuthorization } = require('../middlewares/authorization')
const isLogin = require('../middlewares/authentication')

//projects
router.post('/', isLogin, controller.create)
router.get('/', isLogin, controller.allProjects)
router.get('/look-invitation', isLogin, controller.gotInvitationQuestionMark)
router.post('/add-todo/:id', isLogin,  controller.addTodo)
router.get('/get-project-todo/:todoId', isLogin, controller.findTodo)
router.delete('/delete-todo-from-project/:id', isLogin, controller.delete)
router.patch('/edit-todo-in-project/:projectId/:todoId', isLogin, controller.editTodo)
router.patch('/invite-member/:id', isLogin, controller.inviteMember)
router.delete('/remove-member/:memberId/:projectId', isLogin, controller.removeMember)
router.patch('/add-user/:id', isLogin, controller.addUser)
router.patch('/user-accepting-invitation/:id', isLogin, controller.userAcceptingInvitation)
router.patch('/user-rejecting-invitation/:id', isLogin, controller.userRejectingInvitation)
router.delete('/:id/:todoId', isLogin, controller.removeTodo)
router.get('/:id', isLogin, controller.getProject)

module.exports = router