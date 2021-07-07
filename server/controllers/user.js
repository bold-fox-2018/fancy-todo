const User = require('../models/user')
const jwt = require('jsonwebtoken')
const { comparePass, jwtSign } = require('../helpers/util')
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

module.exports = {
    authGoogle: (req, res) => {
        let payload = null
        client
            .verifyIdToken({
                idToken: req.body.idToken,
                audience: process.env.GOOGLE_CLIENT_ID
            })
            .then(ticket => {
                payload = ticket.getPayload()
                return User
                    .findOne({ email: payload.email })
            })
            .then(user => {
                if (!user) {
                    return User
                        .create({
                            email: payload.email,
                            password: process.env.GOOGLE_PASS,
                            source: `google`,
                            fullName: payload.name,
                            role: 'user'
                        })
                        .then(newUser => {
                            let googleUser = {
                                email: newUser.email,
                                id: newUser._id
                            }
                            res.status(201).json({
                                message: `create success`,
                                data: newUser,
                                token: jwtSign(googleUser)
                            })
                        })
                } else {
                    let googleUser = {
                        email: user.email,
                        id: user._id
                    }
                    res.status(200).json({
                        message: `sign in success`,
                        token: jwtSign(googleUser)
                    })
                }
            })
            .catch(err => {
                console.log(err)
                res.status(500).json({
                    message: `internal server error`
                })
            })
    },
    register: (req, res) => {
        User
            .create({
                email: req.body.email,
                password: req.body.password,
                fullName: req.body.fullName,
                role: req.body.role
            })
            .then(user => {
                res.status(201).json(user)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    },
    login: (req, res) => {
        User
            .findOne({
                email: req.body.email
            })
            .then(user => {
                if (!user) res.status(400).json({ message: `invalid username/password` })
                else {
                    if (!comparePass(req.body.password, user.password)) {
                        console.log('masuk')
                        res.status(400).json({ message: `invalid username/password` })
                    }
                    else {
                        let token = jwt.sign({
                            id: user._id,
                            email: user.email,
                            fullName: user.fullName,
                            role: user.role
                        }, process.env.JWTSECRET)
                        res.status(200).json({ token })
                    }
                }
            })
            .catch(err => {
                res.status(500).json(err)
            })
    },
    findAll: (req, res) => {
        User
            .find({
                _id: { $ne: req.user.id }
            })
            .then(users => {
                res.status(200).json(users)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }
}