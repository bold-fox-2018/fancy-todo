const router = require('express').Router();
const projectController = require('../controllers/projectController');
const { projectAuthorization } = require('../middlewares/verifyUser');

router.post('/', projectController.create);
router.get('/invitation', projectController.readInvitation);
router.get('/', projectController.read);
router.patch('/invite/:projectId', projectAuthorization, projectController.invite);
router.patch('/accept/:projectId', projectController.accept);
router.patch('/decline/:projectId', projectController.decline);
router.delete('/:projectId', projectAuthorization, projectController.delete);

module.exports = router;