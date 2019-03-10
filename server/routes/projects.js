const router = require('express').Router()
const controller = require('../controllers/projectController')
// const { projectAuthorization } = require('../middlewares/authorization')

//projects
router.post('/', controller.create)
router.get('/', controller.allProjects)
router.get('/look-invitation', controller.gotInvitationQuestionMark)
router.post('/add-todo/:id', controller.addTodo)
router.get('/get-project-todo/:todoId', controller.findTodo)
router.delete('/delete-todo-from-project/:id', controller.delete)
router.patch('/invite-member/:id', controller.inviteMember)
router.delete('/remove-member/:memberId/:projectId', controller.removeMember)
router.patch('/add-user/:id', controller.addUser)
router.patch('/user-accepting-invitation/:id', controller.userAcceptingInvitation)
router.patch('/user-rejecting-invitation/:id', controller.userRejectingInvitation)
router.delete('/:id/:todoId', controller.removeTodo)
router.get('/:id', controller.getProject)

module.exports = router

// Authenticated user bisa membuat project, dan invite/add member ke project tersebut.
// User dapat membuat todo di project yang sudah dipilih
// Todo yang ada di suatu project hanya bisa di read/write (CRUD) oleh project members.