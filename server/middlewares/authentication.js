const { decoder } = require('../helpers/jwt')

function isLogin(req, res, next) {
    if (!req.headers.access_token) {
        res
            .status(401)
            .json({
                msg: `Unauthorized Access, token should be included`
            })
    } else {
        try {
            let decoded = decoder(req.headers.access_token)
            req.decoded = decoded
            next()
        }
        catch(err) {
            res
                .status(401)
                .json({
                    msg: `Unauthorized Access, Token Invalid`,
                    err: err
                })
        }
    }
}

module.exports = isLogin