const jwt = require('../helpers/jwt')

module.exports = function (req, res, next) {
    if(req.headers.hasOwnProperty('token')) {
        try {
            const decoded = jwt.verify(req.headers.token)
            req.headers = { ...req.headers ,...decoded}
            next()
        } catch(err) {
            res.status(400).json({
                message: 'Bad request'
            })
        }
    } else {
        res.status(401).json({
            message: 'Unauthorized'
        })
    }
}