const router = require('express').Router()
const userController = require('../controllers/userController')

router.get('/', userController.findAll)
router.post('/', userController.create)
router.post('/google', userController.signInGoogle)
router.post('/signup', userController.signUp)
router.post('/signin', userController.signInApp)
router.put('/:id', userController.update)
router.delete('/:id', userController.delete)

module.exports = router