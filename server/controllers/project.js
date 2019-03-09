const crypto = require('crypto');
const Project = require('../models/project');
const User = require('../models/user');
const Token = require('../models/token');
const mailer = require('../helpers/mailer');

module.exports = {
  createProject(req, res) {
    let newProject = {
      projectName: req.body.projectName,
      projectLeader: req.auth_user.id,
      projectMember: {
        members: req.auth_user.id
      }
    }
    Project.create(newProject)
      .then(project => {
        res.status(201).json({
          project,
          message: 'Successfully create project'
        })
      })
      .catch(err => {
        let error = err.errors;
        if (error.hasOwnProperty('projectName')) {
          res.status(400).json(error.projectName.message);
        } else {
          res.status(500).json(err);
        }
      });
  },
  findProject(req, res) {
    Project
      .findById(req.params.id)
      .populate({ path: 'projectLeader', select: 'name' })
      .populate({ path: 'projectMember.members', select: 'name' })
      .then(project => {
        if (project) {
          res.json(project);
        } else {
          res.status(404).json({ message: 'Project not found' });
        }
      })
      .catch(err => {
        res.status(500).json(err);
      });
  },
  findAllProject(req, res) {
    Project
      .find({})
      .populate({ path: 'projectLeader', select: 'name' })
      .populate({ path: 'projectMember.members', select: 'name' })
      .then(projects => {
        if (projects.length) {
          res.json(projects);
        } else {
          res.status(404).json({ message: 'Project not found' });
        }
      })
      .catch(err => {
        res.status(500).json(err);
      });
  },
  updateProject(req, res) {
    Project
      .findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then(project => {
        if (project) {
          res.json({
            project,
            message: 'Project updated'
          });
        } else {
          res.status(404).json({ message: 'Project not found' });
        }
      })
      .catch(err => {
        res.status(500).json(err);
      });
  },
  deleteProject(req, res) {
    Project.findByIdAndDelete(req.params.id)
      .then(project => {
        if (project) {
          res.json({
            project,
            message: 'Project deleted'
          });
        } else {
          res.status(404).json({ message: 'Project not found' });
        }
      })
      .catch(err => {
        res.status(500).json(err);
      });
  },
  inviteMember(req, res) {
    User.findById(req.params.userId)
      .then(user => {
        let verification = new Token({
          userId: user._id,
          token: crypto.randomBytes(15).toString('hex')
        })
        verification.save();
        mailer(verification, user, function (err) {
          if (err) {
            res.status(400).json(err);
          } else {
            res.json({
              message: `A verification email has been sent to ${user.email}.`
            });
          }
        });
      })
      .catch(err => {
        res.status(500).json(err);
      })
  },
  verifyInvitation(req, res) {
    // console.log('=========>');
    Token
      .findOne({ token: req.params.token })
      .then(token => {
        if (!token) {
          res.status(400).json({ message: 'Invitation token is invalid' })
        } else {
          return Project
            .findById()
        }
      })
      .catch(err => {
        res.status(500).json(err);
      })
  },
  createTask(req, res) {

  },
  kickMember(req, res) {

  }
};

