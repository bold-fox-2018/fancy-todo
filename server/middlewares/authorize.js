const User = require('../models/user');
const Project = require('../models/project');

module.exports = {
  projectLeader(req, res, next) {
    Project
      .findById(req.params.id)
      .then(project => {
        if (project.projectLeader == req.auth_user.id) {
          next();
        } else {
          res.status(401).json({ message: 'You don\'t have the privilege to make changes project' });
        }
      })
      .catch(err => {
        res.status(500).json(err);
      });
  }
};
