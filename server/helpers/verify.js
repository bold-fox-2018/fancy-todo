const jwt = require('jsonwebtoken')
require('dotenv').config()

function verify(token) {
     return jwt.verify(token, process.env.SECRET_KEY)
}

module.exports = verify