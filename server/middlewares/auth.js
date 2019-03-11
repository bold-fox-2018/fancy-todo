const jwt = require('jsonwebtoken');
module.exports = function (req, res, next) {
    if (req.headers.hasOwnProperty('token')) {
        try {
            req.userLoggedIn = jwt.verify(req.headers.token, process.env.JWT_SECRET)
            console.log(req.userLoggedIn);
            next();
        }
        catch {
            res.status(401)
                .json({ message: `Invalid Token` })
        }
    }
    else {
        res.status(401)
            .json({ message: `you must login first` })
    }
}