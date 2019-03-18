const { OAuth2Client } = require('google-auth-library')
const User = require('../models/User')
const verify = require('../helpers/verify')
require('dotenv').config()
const jwt = require('jsonwebtoken')
const client = new OAuth2Client(process.env.CLIENT_ID)

// console.log(process.env.SECRET_KEY)
// console.log(process.env.CLIENT_ID)

class GoogleController {

    static login(req, res, next) {
        if (req.body.idtoken === null) {
            console.log('Invalid Token')
        } else {
            client.verifyIdToken({
                idToken: req.body.idtoken,
                audience: process.env.CLIENT_ID
            })
            .then(ticket=>{
                const { email, name, picture } = ticket.getPayload()
                const accesToken = jwt.sign({ email }, process.env.SECRET_KEY)
                // res.status(200).json({email, name, picture, accessToken})
                res.status(200).json({accesToken})
                // console.log(accesToken)
                const isMatch = verify(accesToken)
                if (isMatch) {
                    return User.findOne({
                        email: isMatch.email
                    })
                    .then(user=>{
                        if (user === null) {
                            // console.log(isMatch.email)
                            return User.create({email: isMatch.email, password: process.env.PASSWORD})
                        } else if (user) {
                            // console.log(user, 'user nya sudah ada')
                        }
                    })
                    .then(newuser=>{
                        // console.log(newuser, 'return create new user')
                        // res
                    })
                } 
            })
            .catch(err=>{
                console.log('masok error')
                res.status(500).json(err)
            })

        }
    }
}

module.exports = GoogleController