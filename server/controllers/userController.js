//William
const User = require('../models/user.js');
const bcrypt = require('bcrypt');
const jwtConvert = require('../helpers/jwtConvert');
const googleSignin = require('../helpers/googleSignIn');

class UserController {
    static findAll(req,res) {
        User
            .find()
            .then(result => {
                res.status(200).json(result)
            })
            .catch(err => {
                res.status(500).json({
                    message: "internal server error"
                })
            })
    }
    
  
    static register (req,res) {
      console.log("masuk ke register", req.body)
    User
      .create({
        email: req.body.email,
        password: req.body.password
      })
      .then(user => {
        res.status(201).json({
          message: `email ${user.email} have been created`
        })
      })
      .catch(error => {
        res.status(500).json({
          message: 'Internal Server Error'
        })
        
      }) 
    }

    static login (req, res) {
        if(req.body.loginVia == 'website') {
        console.log("Masuk ke login", req.body)  
        User
            .findOne({
              email: req.body.email
            })
            .then(user => {
              console.log('tes====', process.env )
              if(!user) {
                console.log("hasil login", user)
                res.status(400).json({
                  message: 'Wrong Email/Password'
                })
              } else {
                console.log("User ditemukan!", user)
                let isValid = bcrypt.compareSync(req.body.password, user.password);
                if(isValid) {
                  let token = jwtConvert.sign({email: user.email}, process.env.SECRETKEY)
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

  static getUserDetail(req,res){
      User.findOne({
          email: req.loggedInUser.email
      }).populate('listsTask')
        .then(user =>{
          console.log("hasil getuserdetail: ", user)
          res.status(200).json({
              msg: `Detail of user ${user.name}`,
              userid: user._id,
              name: user.name,
              email: user.email,
              listsTasks: user.listsTask
          })
        })
        .catch(error =>{
          res.status(500).json({
              msg: 'ERROR: ',error
          })
        })
  }
}

module.exports = UserController