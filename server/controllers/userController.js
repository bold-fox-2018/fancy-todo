const User = require('../models/user');
const jwtConvert = require('../helpers/jwtConvert');
const bcrypt = require('bcrypt');
const googleSignin = require('../helpers/googleSIgnIn');

class ClassController {
  static register (req, res) {
    User
      .create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      })
      .then(user => {
        res.status(201).json({
          message: `email ${user.email} have been created`
        })
      })
      .catch(error => {
        if(error.message.indexOf('validation') !== -1) {
          res.status(400).json({
            message: error.message
          })
        } else {
          res.status(500).json({
            message: 'Internal Server Error'
          })
        }
      })
  }

  static login (req, res) {
    if(req.body.loginVia == 'website') {
      User
        .findOne({
          email: req.body.email
        })
        .then(user => {
          if(!user) {
            res.status(400).json({
              message: 'Wrong Email/Password'
            })
          } else {
            let isValid = bcrypt.compareSync(req.body.password, user.password);
            if(isValid) {
              let token = jwtConvert.sign({
                email: user.email
              })
              res.status(200).json({
                token: token
              })
            } else {
              res.status(400).json({
                message: 'Wrong Email/Password'
              })
            }
          }
        })
    } else if(req.body.loginVia == 'google') {
      googleSignin(req.body.id_token)
        .then(user => {
          User
            .findOne({
              email: user.email
            })
            .then(findUser => {
              if(!findUser) {
                User
                  .create({
                    email: user.email,
                    password: process.env.GOOGLE_DEFAULT_PASSWORD
                  })
                  .then(registerUser => {
                    let token = jwtConvert.sign({
                      email: registerUser.email
                    })
                    res.status(201).json({
                      token: token
                    })
                  })
              } else {
                let token = jwtConvert.sign({
                  email: user.email
                })
                res.status(200).json({
                  token: token
                })
              }
            })
        })
    }
  }

  static findAll(req, res) {
      User
        .find()
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            res.status(400).json({
                message: 'Data tidak ada'
            })
        })
  }

  static update(req, res) {
      User
        .update({
            _id: req.params.id
        },{
            $set: req.body
        })
        .then(data => {
            res.status(200).json({
                message: 'Data telah di update',
                data
            })
        })
        .catch(err => {
            res.status(400).json({
                message: 'Update data has been failed'
            }) 
        })
  }

  static delete(req, res) {
      User
        .findByIdAndDelete({
            _id: req.params.id
        })
        .then(data => {
            res.status(200).json({
                message: 'Data has been deleted',
                data
            })
        })
        .catch(err => {
            res.status(400).json({
                message: 'Delete data has been failed'
            })
        })
  }

  static findOne(req, res) {
      User
        .findOne({ _id: req.body.id })
        .populate('todo')
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            res.status(400).json({
                message: 'Data not found'
            })
        })
  }
}

module.exports = ClassController
