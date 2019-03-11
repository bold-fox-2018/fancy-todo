const User = require('../models/users')
const comparePassword = require('../helpers/comparePassword')
const jwt = require('jsonwebtoken')
const { OAuth2Client } = require('google-auth-library')
const client = new OAuth2Client(process.env.CLIENT_ID)
const ENV = require('dotenv')
ENV.config()

class UserController {
    static registerUser(req, res) {
        const { firstName, lastName, email, username, password } = req.body
            User.create({
                firstName: firstName,
                lastName: lastName,
                email: email,
                username: username,
                password: password
            })
            .then(function({ data }) {
                res.status(201).json(data)
            })
            .catch(function(e) {
                res.status(500).json({
                    error: e.message
                })
            })
    }

    static userLogin(req, res) {
        const { username, password } = req.body
        let user
        User.findOne({
            username: username
        })
        .then(function(dataUser) {
            user = dataUser
            if (!dataUser) {
                res.status(404).json({
                    message: 'USERNAME ATAU PASSWORD ANDA SALAH'
                }) 
            } else {
                return comparePassword(password, user.password)
            }
        })
        .then(function(result) {
            if (!result) {
                res.status(400).json({
                    message: 'USERNAME ATAU PASSWORD ANDA SALAH'
                })
            } else {
                const payload = {
                    id: `${user._id}`,
                    username: user.username
                }
                const token = jwt.sign(payload, process.env.SECRET)
                res.status(200).json({ 
                    token: token,
                    data: user
                })
            }
        }) 
        .catch(function(e) {
            res.status(500).json({
                error: e.message
            })
        })
    }

    static googlelogin(req, res) {
        let logged = ""
        client.verifyIdToken({
            idToken : req.body.id_token,
            audience : process.env.CLIENT_ID })
            .then(response => {
                logged = response.payload
                return User.findOne({ email: logged.email })

            })
            .then(data => {
                if (data) {
                    res.status(200).json({
                        message: 'user succesfully logged',
                        token: jwt.sign({
                            id: data.id,
                            email: data.email
                        }, process.env.JWTSECRET), data: data
                    })
                } else {
                    return User.create(
                        {
                            firstName: logged.given_name,
                            lastName: logged.family_name,
                            email: logged.email,
                            username: logged.email,
                            password: 'password'
                        }
                    )
                    .then(data => {
                        res.status(201).json({
                            message: 'user created',
                            token: jwt.sign({
                                id: logged.id,
                                email: logged.email
                            }, process.env.JWTSECRET), data: data
                        })
                    })
                }
            })
            .catch(err => {
                res.status(err).json(err)
            })
    }
}

module.exports = UserController
