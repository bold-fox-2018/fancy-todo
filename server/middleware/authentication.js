const jwt = require('jsonwebtoken')

const ENV = require('dotenv')
ENV.config()
module.exports = (req, res, next) => {
    if (req.headers.hasOwnProperty('token')) {
        try {
            var decode = jwt.verify(req.headers.token, process.env.SECRET)
            next()
        } catch(e) {
            res.status(400).json({
                message: 'PLEASE LOGIN AND GET TOKEN - ini salah'
            })
        }
    } else {
        res.status(400).json({
            message : 'PLEASE LOGIN AND GET TOKEN'
        })
    }
}