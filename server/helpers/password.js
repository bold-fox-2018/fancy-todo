const bcrypt = require('bcrypt')
const saltRounds = 10
const jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports = {
    encryptPass: (pass) => {
        return bcrypt.hashSync(pass, saltRounds)
    },
    comparePass: (inputPass, storedPass) => {
        return bcrypt.compareSync(inputPass, storedPass)
    },
    jwtSign: (payload) => {
        try {
            return jwt.sign(payload, process.env.JWTSECRET)
        }
        catch (error) {
            throw error
        }
    },
    jwtVerfiy: (token) => {
        try {
            return jwt.verify(token, process.env.JWTSECRET)
        }
        catch (error) {
            throw error
        }
    }

}