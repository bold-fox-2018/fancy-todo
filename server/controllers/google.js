const jwt = require('jsonwebtoken')
const ENV = require('dotenv')
ENV.config()
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID);
const user = require('../models/user')
class Google {

    static login(req, res) {

        var newEmail = ''
        client.verifyIdToken({
                idToken: req.body.id_token,
                audience: process.env.CLIENT_ID
            })
            .then(function(pass) {
                console.log(pass.getPayload())
                console.log(pass.getPayload().email)
                    // const { email, name, piscture } = pass.getPayLoad()
                newEmail = pass.getPayload().email
                return user.findOne({
                    email: newEmail
                })
            })
            .then(function(user) {
                if (!user) {
                    console.log(newEmail, 'in email baru')
                    return user.create({
                        email: newEmail,
                        password: 'password'
                    })
                } else {
                    console.log('ini google')
                    const token = jwt.sign({ email: newEmail }, process.env.CLIENT_ID)
                    res.status(200).json({
                        email,
                        name,
                        picture,
                        token
                    })
                }
            })
            .then(function(newUser) {
                console.log('ini baru')
                const token = jwt.sign({ email: newUser.email }, process.env.CLIENT_ID)
                res.status(200).json({
                    email,
                    name,
                    picture,
                    token
                })
            })
            .catch(function(err) {
                console.log(err)
                res.status(500).json(err)
            })
    }
}

module.exports = Google