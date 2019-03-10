const router = require('express').Router();
const todoController = require('../controllers/todoController.js');
const { authorization, projectAuthorization} = require('../middlewares/verifyUser.js');

router.use('/project/:projectId', projectAuthorization);
router.get('/project/:projectId', todoController.readTodoProject);
router.post('/project/:projectId', todoController.createTodoProject);
router.patch('/project/:projectId/:id', todoController.updateTodoProject);
router.delete('/project/:projectId/:id', todoController.deleteTodoProject);

router.get('/', todoController.read);
router.post('/', todoController.create);
router.use('/:id', authorization);
router.patch('/:id', todoController.update);
router.delete('/:id', todoController.delete);


module.exports = router;