const getJWT = require('../helpers/getJWT.js');
const User = require('../models/user.js');
const Todo = require('../models/todo.js');
const Project = require('../models/project.js');

module.exports = {
  projectAuthorization: (req, res, next) => {
    if(req.params.projectId) {
      Project
        .findOne({
          _id: req.params.projectId,
          members: req.userLogin.userId
        })
        .then(project => {
          if(project) {
            req.currentProject = project;
            next();
          } else {
            res.status(404).json({
              err: 'Project Not Found/Not Authorized To Access This Project'
            })            
          }
        })
        .catch(err => {
          res.status(500).json({
            err: err
          })
        })
    } else {
      res.status(404).json({
        err: 'Project Not Found'
      })
    }
  },

  authorization: (req, res, next) => {
    Todo
      .findOne({
        _id: req.params.id
      })
      .then(todo => {
        if (todo.userId != req.userLogin._id) {
          res.status(400).json({ err: `You Didn't Authorized to Use This Feature` });
        } else {
          next();
        }
      })
      .catch(err => {
        res.status(500).json({ err: err.message });
      })
  },

  authentication: (req, res, next) => {
    if (req.headers.token) {
      const { data } = getJWT(req.headers.token, 'verify');
      User
        .findOne({
          email: data.email
        })
        .then(user => {
          if (!user) {
            res.status(400).json({ err: `Invalid Token` });
          } else {
            req.userLogin = data;
            next();
          }
        })
        .catch(err => {
          res.status(500).json({ err: err.message });
        })
    } else {
      res.status(400).json({ err: `User Login Have Been Changed, Please Login Again` });
    }
  }
}