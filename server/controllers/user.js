const { User } = require('../models');

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

  create: function({ body }, res, next) {
    User
      .create({...body})
      .then(function(user) {
        res.status(201).json(user);
      })
      .catch(next);
  }
}