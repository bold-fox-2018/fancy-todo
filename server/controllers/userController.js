require('dotenv').config();
const User = require('../models/user.js');
const decodeGoogleUserInfo = require('../helpers/decodeGoogleUserInfo.js');
const hashPassword = require('../helpers/hashPassword.js');
const getJWT = require('../helpers/getJWT.js');

class UserController {
  static signin(req, res){
    if(req.body.loginVia === 'google'){
      decodeGoogleUserInfo(req.headers.token_id)
        .then(userInfo => {
          return User
            .findOne({
              email: userInfo.email
            })
            .then(user => {
              if(user){
                if(user.loginVia !== 'google') {
                  throw new Error(`Please Signin Via ${user.loginVia}`)
                } else {
                  let userInfo = {
                    userId: user._id,
                    email: user.email,
                    name: user.name,
                    loginVia: user.loginVia
                  }
                  let payload = {
                    token: getJWT(userInfo, 'sign'),
                    userId: user._id,
                    email: user.email,
                    name: user.name,
                    loginVia: user.loginVia
                  };
                  res.status(200).json(payload);
                }
              } else {
                return User
                  .create({
                    name: userInfo.name,
                    email: userInfo.email,
                    password: hashPassword(process.env.GOOGLE_DEFAULT_PASSWORD),
                    profilePicture: userInfo.picture,
                    loginVia: 'google'
                  })
                  .then(user => {
                    let userInfo = {
                      userId: user._id,
                      email: user.email,
                      name: user.name,
                      loginVia: user.loginVia
                    }
                    let payload = {
                      token: getJWT(userInfo, 'sign'),
                      userId: user._id,
                      email: user.email,
                      name: user.name,
                      loginVia: user.loginVia
                    };
                    res.status(201).json(payload);
                  })
              }
            })
        })
        .catch(err => {
          res.status(500).json({err: err.message});
        })
    } else if(req.body.loginVia === 'website'){
      User
        .findOne({
          email: req.body.email,
          password: hashPassword(req.body.password)
        })
        .then(user => {
          if(user) {
            if(user.loginVia !== 'website') {
              res.status(400).json({err: `Please Signin Via ${user.loginVia}`})
            } else {
              let userInfo = {
                userId: user._id,
                email: user.email,
                name: user.name,
                loginVia: user.loginVia
              }
              let payload = {
                token: getJWT(userInfo, 'sign'),
                userId: user._id,
                email: user.email,
                name: user.name,
                loginVia: user.loginVia
              };
              res.status(200).json(payload);
            }
          } else {
            res.status(400).json({err: 'Wrong Username/Password'});
          }
        })
        .catch(err => {
          res.status(500).json({err: err.message});
        })
    }
  }

  static signup(req, res){
    User
      .create({
        name: req.body.name,
        email: req.body.email,
        password: hashPassword(req.body.password),
        loginVia: 'website'
      })
      .then(user => {
        res.status(201).json(getJWT(user, 'sign'));
      })
      .catch(err => {
        res.status(500).json({err: err.message});
      })
  }

  static verify(req, res) {
    let payload = {
      token: req.body.token,
      userId: req.userLogin._id,
      email: req.userLogin.email,
      name: req.userLogin.name,
      loginVia: req.userLogin.loginVia
    };
    res.status(200).json(payload);
  }
}

module.exports = UserController;
