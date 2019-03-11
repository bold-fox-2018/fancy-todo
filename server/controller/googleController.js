const Users = require('../models/user')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client("994783709716-0lg3hdbhdp2a8glo3n14nciuamav875e.apps.googleusercontent.com");



class googleController {

    static signin(req, res) {
        client
            .verifyIdToken({
                idToken: req.body.id_token
            })
            .then(data => {
                let payload = data.getPayload()
                return Users.findOne({ email: payload.email })
                    .then(user => {
                        if (user == null) {
                            return Users
                                .create({
                                    first_name: payload.given_name,
                                    last_name: payload.family_name,
                                    email: payload.email,
                                    password: 'XXXXXX',
                                    source: 'google',
                                })
                                .then(user => {
                                    res.status(201).json({
                                        message: 'new user created',
                                        token: jwt.sign({
                                            email : user.email,
                                            id : user._id
                                        }, process.env.JWTTOKEN)
                                    })
                                })
                        } else {
                            res.status(201).json({
                                message: 'new user created',
                                token: jwt.sign({
                                    email : user.email,
                                    id : user._id
                                }, process.env.JWTTOKEN)
                            })
                        }

                    })


            })
            .catch(err => {
                res.status(500).json(err)
            })
    }

    static tokenVerification(req, res) {
        try {
            let decoded = jwt.verify(req.body.token, process.env.JWTTOKEN)
            Users
                .findOne({ email: decoded.email })
                .then(user => {
                    res.status(200).json({ message: 'token benar', action: true ,data : user})
                })
                .catch(err => {
                    res.status(500).json({ message: 'internal server error', error: err })
                })

        } catch (err) {
            res.status(402).json({ message: "you're not authorize for this session" })
        }
    }
}

module.exports = googleController