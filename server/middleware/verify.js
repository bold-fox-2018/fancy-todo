const jwt = require('jsonwebtoken')
const ENV = require('dotenv')
ENV.config()
module.exports = function(req, res, next) {

    if (req.headers.hasOwnProperty('token')) {
        console.log('verify')
        jwt.verify(req.headers.token, 'ancientGear', (err, authentic) => {
            if (!err) {
                next()
            } else {
                res.status(403).json({
                    message: 'Token Invalid'
                })
            }
        })
    }
}