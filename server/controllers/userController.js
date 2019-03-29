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
              // console.log( user.email, '<<<<<<<<<<<<<<', process.env.GOOGLE_DEFAULT_PASSWORD)
              let token = jwtConvert.sign({
                email: user.email
              })
              // console.log(token)
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
        .catch((err) => {
          // console.log('masuk')
          res.status(400).json(err)
        })
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
