const jwtConvert = require('../helper/jwt');
var secret = '123'

function verify(req, res, next) {

  if (req.headers.hasOwnProperty('token')) {
    try {
      const decoded = jwtConvert.verify(req.headers.token, secret)
      req.loggedInUser = decoded
      next()
    } catch (error) {
      res.status(401).json({
        message: 'Invalid Token'
      })
    }
  } else {
    res.status(400).json({
      message: 'Please Provide Token'
    })
  }

}

module.exports = verify