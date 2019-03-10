require('dotenv').config()
const jwt = require('jsonwebtoken')

function generate(user) {
    let token = jwt.sign({
        id: user.id,
        email: user.email,
        role: user.role
    }, process.env.JWT_SECRET)
    return token
}

function decoder(token) {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return decoded
    }
    catch(err) {
        res
            .status(401)
            .json({
                msg: `ERROR: Unauthorized Access!`
            })
    }
}

module.exports = { generate, decoder }