const { User } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;
const { googleAuth } = require('../helpers/auth');

module.exports = {
  findAll: function(req, res, next) {
    User
      .find()
      .then(function(users) {
        res.status(200).json(users);
      })
      .catch(next);
  },
  findOne: function(req, res, next) {
    User
      .findById(params.id)
      .then(function(user) {
        if(user) {
          res.status(200).json(user);
        } else {
          res.status(404).json({
            warning: 'No data is found by given ID.'
          });
        }
      })
      .catch(next);
  },
  register: function({ body }, res, next) {
    User
      .create({local: {...body}})
      .then(function(user) {
        res.status(201).json(user);
      })
      .catch(next);
  },
  signInLocal: function({ body }, res, next) {
    User
      .findOne({
        $or: [
          { username: body.username },
          { email: body.username }
        ]
      })
      .then(function(user) {
        if(!user) {
          res.status(400).json({
            warning: 'Username/Password is wrong.'
          })
        } else {
          if(!bcrypt.compareSync(body.password, user.password)) {
            res.status(400).json({
              warning: 'Username/Password is wrong.'
            })
          } else {
            const accessToken = jwt.sign({ email }, JWT_SECRET);

            res.status(200).json({ email, name, accessToken })
          }
        }
      })
      .catch(next)
  },
  signInGoogle: function({ body }, res, next) {
    googleAuth(body.idtoken)
    .then(function(ticket) {
      const { email, name, picture } = ticket.getPayload();
      User
        .findOne({ email })
        .then(function(user) {
          if(!user) {
            return User.create({
              google: {
                fullname: name,
                email: email
              }
            })
          } else {
            user.google = {
              fullname: name,
              email: email
            }
            return user.save()
          }
        })
        .then(function(user) {
          const accessToken = jwt.sign({ email }, JWT_SECRET);

          res.status(200).json({ email, name, picture, accessToken });
        })
        .catch(next)
    })
    .catch(next)
  },

}