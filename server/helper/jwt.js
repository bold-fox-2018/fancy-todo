const jwt = require('jsonwebtoken');
var secret = '123'
module.exports = {
    sign(user) {
        return jwt.sign(user, secret)
    },

    verify(token) {
        return jwt.verify(token, secret)
    }
}