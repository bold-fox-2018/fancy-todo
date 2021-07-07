require('dotenv').config()

const User = require('../models/users'),
  PassWordGenerator = require('generate-password'),
  jwt = require('jsonwebtoken'),
  axios = require('axios'),
  {OAuth2Client} = require('google-auth-library'),
  CLIENT_ID = process.env.CLIENT_ID,
  client = new OAuth2Client(CLIENT_ID)

module.exports = {
  isLogin: function(req, res, next) {
    let token = req.headers.token
    if (token) {
      jwt.verify(token, process.env.ACCESS_KEY, function(err, decoded) {
        if (!err) {
          User.findOne({
            _id: decoded.id
          })
            .then(function(user) {
              req.user = user
              next()
            })
            .catch(function() {
              res.status(500).json({
                message: `Log in first`
              })
            })
        } else {
          res.status(500).json({
            message: `Log in first`
          })
        }
      })
    }
  },
  getSelf: function(req, res, next) {
    console.log('masuk middlewares/getSelf')
    let token = req.headers.token
    if (token) {
      jwt.verify(token, process.env.ACCESS_KEY, function(err, decoded) {
        if (!err) {
          User.findOne({
            _id: decoded.id
          })
            .then(function(user) {
              res.status(200).json({
                user
              })
            })
            .catch(function() {
              res.status(500).json({
                message: `access denied`
              })
            })
        } else {
          res.status(500).json({
            message: `access denied`
          })
        }
      })
    }
  },
  googleAuth (req,res,next) {
    console.log('masuk middleware/googleAuth')
    let googleToken = req.body.googleToken
    let ticket = new Promise(function(resolve, reject) {
      client.verifyIdToken({
        idToken: googleToken,
        audience: CLIENT_ID
      }, function(err, data) {
        if (!err) {
          let payload = data.getPayload()
          let userid = payload['sub']
          resolve(userid)
        } else {
          reject(err)
        }
      })
    })
    .then (userid => {

      axios({
        method: 'GET',
        url: `https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${googleToken}`
      })
      .then(result => {
        req.body.name = result.data.name
        req.body.email = result.data.email
        let randomPassword = PassWordGenerator.generate()
        req.body.password = randomPassword
        next()
      })
      .catch(err => {
        res.status(500).json({
          message: `access denied`
        })
      })
    }) 
  }
}
