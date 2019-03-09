const routes = require('express').Router();
const authenticate = require('../middlewares/authenticate');
const { createProject, findProject, findAllProject, updateProject, deleteProject, inviteMember, verifyInvitation, createTask, kickMember } = require('../controllers/project');
const { projectLeader } = require('../middlewares/authorize');

routes.use(authenticate);

// CRUD Project
routes.post('/', createProject);
routes.get('/', findAllProject);
routes.get('/:id', findProject);
routes.patch('/:id', projectLeader, updateProject);
routes.delete('/:id', projectLeader, deleteProject);

// invite member
// routes.get('/invite/:userId', inviteMember);

// invite verification
// routes.get('/confirm/:token', verifyInvitation);

module.exports = routes;