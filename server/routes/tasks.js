const routes = require('express').Router();
const { createTask, findTask, findAllTask, updateTask, deleteTask } = require('../controllers/task');
const auth = require('../middlewares/authenticate');

routes.use(auth);
routes.post('/', createTask);
routes.get('/', findAllTask);
routes.get('/:id', findTask);
routes.patch('/:id', updateTask);
routes.delete('/:id', deleteTask);

module.exports = routes;
