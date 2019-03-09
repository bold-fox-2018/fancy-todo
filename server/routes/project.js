const routes = require('express').Router();
const authenticate = require('../middlewares/authenticate');
const { createProject, findProject, findAllProject, updateProject, deleteProject } = require('../controllers/project');
const { projectLeader } = require('../middlewares/authorize');

routes.use(authenticate);
routes.post('/', createProject);
routes.get('/', findAllProject);
routes.get('/:id', findProject);
routes.patch('/:id', projectLeader, updateProject);
routes.delete('/:id', projectLeader, deleteProject);

module.exports = routes;