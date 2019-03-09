const User = require('../models/user');
const jwt = require('jsonwebtoken');
const { compare } = require('../helpers/bcrypt');

module.exports = {
  register(req, res) {
    let newUser = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    };
    User.create(newUser)
      .then(user => {
        res.status(201).json(user);
      })
      .catch(err => {
        let error = err.errors;
        if (error.hasOwnProperty('name')) {
          res.status(400).json(error.name.message);
        } else if (error.hasOwnProperty('email')) {
          res.status(400).json(error.email.message);
        } else if (error.hasOwnProperty('password')) {
          res.status(400).json(error.password.message);
        }
      });
  },
  login(req, res) {
    User.findOne({ email: req.body.email })
      .then(user => {
        if (user) {
          let isValid = compare(req.body.password, user.password);
          if (isValid) {
            let payload = {
              id: user._id,
              name: user.name,
              email: user.email
            }
            let token = jwt.sign(payload, process.env.SECRET_KEY);
            res.json({
              token,
              message: 'Successfully login'
            })
          } else {
            res.status(400).json({ message: 'invalid username/password' });
          }
        } else {
          res.status(400).json({ message: 'invalid username/password' });
        }
      })
      .catch(err => {
        res.status(500).json(err);
      });
  },
  checkUser(req, res) {
    User.findOne({ email: req.auth_user.email }).select('-password')
    .then(user => {
      res.json(user);
    })
    .catch(err => {
      res.status(400).json(err);
    })
  }
};

