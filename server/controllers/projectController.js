const Project = require('../models/project.js');
const User = require('../models/user.js');
const Todo = require('../models/todo.js');

class ProjectController {

  static read(req, res) {
    Project
      .find({
        members: req.userLogin.userId
      })
      .populate('members', '-password')
      .populate('invite')
      .populate('todos')
      .then(project => {
        res.status(200).json(project);
      })
      .catch(err => {
        res.status(500).json({ err: err.message });
      })
  }

  static readInvitation(req, res) {
    Project
      .find({
        invite: req.userLogin.userId
      })
      .populate('members', '-password')
      .populate('invite')
      .populate('todos')
      .then(project => {
        res.status(200).json(project);
      })
      .catch(err => {
        res.status(500).json({ err: err.message });
      })
  }

  static create(req, res) {
    Project
      .create({
        name: req.body.name,
        members: [req.userLogin.userId],
        invite: []
      })
      .then(project => {
        return Project
          .findById(project._id)
          .populate('members', '-password')
          .populate('invite')
          .populate('todos')
          .then (project => {
            res.status(201).json(project);
          })
      })
      .catch(err => {
        res.status(500).json({ err: err.message });
      })
  }

  static invite(req, res) {
    if(req.body.email) {
      Project
        .findOne({
          _id: req.params.projectId
        })
        .then(project => {
          if (project) {
            User
              .findOne({
                email: req.body.email
              })
              .then(user => {
                if(user) {
                  if(project.members.indexOf(user._id) !== -1 || project.invite.indexOf(user._id) !== -1) {
                    res.status(400).json({
                      err: 'Person Already on Members or Invite List'
                    })
                  } else {
                    project.invite.push(user._id);
                    project.save();
                    res.status(200).json(user);
                  }
                } else {
                  res.status(400).json({
                    err: 'User Not Found'
                  })
                }
              })
          }
          else {
            res.status(404).json({ err: `Project Not Found` });
          }
        })
        .catch(err => {
          res.status(500).json({ err: err.message });
        })
    } else {
      res.status(400).json({
        err: `Please input email`
      })
    }
  }

  static accept(req, res) {
    Project
      .findOne({
        _id: req.params.projectId
      })
      .populate('members', '-password')
      .populate('invite')
      .populate('todos')
      .then(project => {
        let check = project.invite.filter(invite => invite._id.toString() === req.userLogin.userId.toString()).length > 0 ? true : false
        if (check) {
          project.members.push(req.userLogin.userId);
          project.invite.splice(project.invite.indexOf(req.userLogin.userId), 1);
          project.save();
          project.members[project.members.length - 1].name = req.userLogin.name;
          project.members[project.members.length - 1].email = req.userLogin.email; 
          res.status(200).json(project);
        } else if (!check) {
          res.status(404).json({ err: `You didn't invited in this project` });
        }
        else {
          res.status(404).json({ err: `Project Not Found` });
        }
      })
      .catch(err => {
        res.status(500).json({ err: err.message });
      })
  }

  static decline(req, res) {
    Project
      .findOne({
        _id: req.params.projectId
      })
      .then(project => {
        let check = project.invite.filter(invite => invite._id.toString() === req.userLogin.userId.toString()).length > 0 ? true : false
        if (check) {
          project.invite.splice(project.invite.indexOf(req.userLogin.userId), 1);
          project.save();
          res.status(200).json(project);
        } else if (!check) {
          res.status(404).json({ err: `You didn't invited in this project` });
        }
        else {
          res.status(404).json({ err: `Project Not Found` });
        }
      })
      .catch(err => {
        res.status(500).json({ err: err.message });
      })
  }

  static removeUser(req, res) {
    Project
      .findOne({
        _id: req.params.projectId
      })
      .then(project => {
        if (project.members.indexOf(req.userLogin.userId) !== -1) {
          project.invite.push(req.userLogin.userId);
          project.members.splice(project.members.indexOf(req.userLogin.userId), 1);
          project.save();
          res.status(200).json(project);
        } else if (project.members.indexOf(req.userLogin.userId) === -1) {
          res.status(404).json({ err: `User not found` });
        }
        else {
          res.status(404).json({ err: `Project Not Found` });
        }
      })
      .catch(err => {
        res.status(500).json({ err: err.message });
      })
  }

  static delete(req, res) {
    Project
      .findOne({
        _id: req.params.projectId
      })
      .then(project => {
        if (project) {
          return Todo
            .find({
              projectId: req.params.projectId
            })
            .remove()
            .then((todos) => {
              const successDeleteName = `Your To Do ${project.name} Have Been Sucessfully Deleted`;
              project.remove();
              res.status(200).json({
                message: successDeleteName});
            })
        }
        else {
          res.status(404).json({ err: `This Project isn't available anymore` });
        }
      })
      .catch(err => {
        res.status(500).json({ err: err.message });
      })
  }

}

module.exports = ProjectController;
