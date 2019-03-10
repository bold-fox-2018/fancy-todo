const router = require('express').Router()
const projectController = require('../controllers/project')
const Authentication = require('../middlewares/authentication')

router.use(Authentication)

router.post('/', projectController.create)
router.get('/', projectController.findAll)
router.get('/:id', projectController.findOne)
router.put('/:id', projectController.update)
router.delete('/:id', projectController.delete)
router.post('/:id', projectController.addMember)

module.exports = router