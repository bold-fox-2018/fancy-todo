const jwt = require('jsonwebtoken');
const { User } = require('../models');

module.exports = {
  auth: function(req, res, next) {
    jwt.verify(req.headers.token, process.env.JWT_SECRET, function(err, decoded) {
      if (!err) {
        
        User.findById(decoded.id, function(err, user) {
          if (!err) {
            if (user) {
              req.userId = decoded.id
              next()
            } else {
              res.status(500).json({
                warning: 'Invalid token!'
              })
            }
          } else {
            res.status(500).json({
              message: err
            })
          }
        })
      } else {
        res.status(500).json({
          message: err
        })
      }
    });
  }
}