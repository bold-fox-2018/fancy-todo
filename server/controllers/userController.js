require('dotenv').config()
const User = require('../models/user')
const { OAuth2Client } = require('google-auth-library')
const client = new OAuth2Client(process.env.CLIENT_ID)
const { generate, decoder } = require('../helpers/jwt')
const { decrypt } = require('../helpers/bcrypt')

class Controller {
    static login(req, res) {
        let userData;
        if (!req.body.token) {
            return User.findOne({
                email: req.body.email
            })
                .then(userFound => {
                    if (!userFound) {
                        res
                            .status(422)
                            .json({
                                msg: `Invalid Email/Password`
                            })
                    } else {
                        let decrypting = decrypt(req.body.password, userFound.password);
                        if (!decrypting) {
                            res
                                .status(422)
                                .json({
                                    msg: `Invalid Email/Password`
                                })
                        } else {
                            let token = generate(userFound)
                            res
                                .status(200)
                                .json({
                                    token: token,
                                    id: userFound._id
                                })
                        }
                    }
                })
                .catch(err => {
                    console.log(err)
                    res
                        .status(500)
                        .json({
                            msg: `Internal Server Error`,
                            err: err
                        })
                })
        } else {
            client.verifyIdToken({
                idToken: req.body.token,
                audience: process.env.CLIENT_ID
            })
                .then(ticket => {
                    const payload = ticket.getPayload()
                    userData = payload
                    let indexAt = userData.email.split('').indexOf('@')
                    userData.username = userData.email.split('').splice(0, indexAt).join('')
                    return User.findOne({
                        email: payload.email
                    })
                })
                .then(user => {
                    if (!user) {
                        return User.create({
                            name: userData.name,
                            username: userData.username,
                            email: userData.email,
                            password: process.env.AUTO_GENERATE_PASSWORD
                        })
                            .then(newUser => {
                                let token = generate(newUser)
                                res
                                    .status(200)
                                    .json({
                                        token: token,
                                        id: newUser._id
                                    })
                            })
                    } else {
                        let token = generate(user)
                        res
                            .status(200)
                            .json({
                                token: token,
                                id: user._id
                            })
                    }
                })
                .catch(err => {
                    console.log(err)
                    res
                        .status(500)
                        .json({
                            msg: `Internal Server Error`,
                            err: err
                        })
                })
        }
    }

    static register(req, res) {
        // console.log(req.body)
        User
            .create({
                name: req.body.name,
                username: req.body.username,
                email: req.body.email,
                password: req.body.password
            })
            .then(newUser => {
                let token = generate(newUser)
                res
                    .status(201)
                    .json({
                        token: token,
                        id: newUser._id
                    })
            })
            .catch(err => {
                let modelValidation = []
                if (err.errors.username) modelValidation.push(err.errors.username.properties.message)//'username '
                if (err.errors.name) modelValidation.push(err.errors.name.properties.message)
                if (err.errors.email) modelValidation.push(err.errors.email.properties.message)//'email '
                if (err.errors.password) modelValidation.push(err.errors.password.properties.message)//'password '
                if (modelValidation.length > 0) {
                    res
                        .status(400)
                        .json({
                            msg: `Bad Request`,
                            modelValidation
                        })
                } else {
                    res
                        .status(500)
                        .json({
                            msg: `Internal Server Error`,
                            err: err
                        })
                }
            })
    }

    static allUsers(req, res) {
        if (req.query.search) {
            let regex = new RegExp(req.query.search, 'i')

            User.find({
                username: {
                    $in: [regex]
                }
            })
                .then(books => {
                    res
                        .status(200)
                        .json(books)
                })
                .catch(err => {
                    res
                        .status(500)
                        .json({
                            msg: `Internal server error`,
                            err: err
                        })
                })
        } else {
            User.find({})
                .then(users => {
                    res
                        .status(200)
                        .json(users)
                })
                .catch(err => {
                    console.log(err)
                    res
                        .status(500)
                        .json({
                            msg: `Internal Server Error`,
                            err: err
                        })
                })
        }
    }

    static getUser(req, res) {
        User
            .findById(req.params.id)
            .then(user => {
                res
                    .status(200)
                    .json(user)
            })
            .catch(err => {
                console.log(err)
                res
                    .status(500)
                    .json({
                        msg: `Internal Server Error`,
                        err: err
                    })
            })
    }
}

module.exports = Controller