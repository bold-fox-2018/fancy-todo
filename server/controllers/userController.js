const userModel = require('../models/userModel')
const mongoose = require('mongoose')
const bcryptjs = require('../helpers/bcrypt')
const jwt = require('jsonwebtoken')
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID);

class Controller {
    static findAll(req, res) {
        userModel
            .find({})
            .then(users => {
                res.status(200).json(users)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }

    static create(req, res) {
        userModel
            .create({
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                email: req.body.email,
                password: bcryptjs.hash(req.body.password),
                source: req.body.source
            })
            .then(newUser => {
                res.status(201).json(newUser)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }

    static update(req, res) {
        userModel
            .findByIdAndUpdate(mongoose.Types.ObjectId(req.params.id), { ...req.body }, { new: true })
            .then(updatedTodo => {
                res.status(200).json(updatedTodo)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }

    static delete(req, res) {
        userModel
            .findByIdAndDelete(mongoose.Types.ObjectId(req.params.id))
            .then(deleted => {
                res.status(200).json(deleted)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }

    static signUp(req, res) {
        userModel
            .findOne({ 'email': req.body.email })
            .then(user => {
                if (user) {
                    res.status(401).json({ message: 'Email is already taken' })
                } else {
                    return userModel
                        .create({
                            first_name: req.body.first_name,
                            last_name: req.body.last_name,
                            email: req.body.email,
                            password: req.body.password
                        })
                }
            })
            .then(newUser => {
                res.status(201).json(newUser)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }

    static signInApp(req, res) {
        userModel
            .findOne({ 'email': req.body.email })
            .then(user => {
                if (!user) {
                    res.status(401).json({ message: `email/password wrong` })
                } else {
                    if (bcryptjs.compare(req.body.password, user.password) == false) {
                        res.status(401).json({ message: `email/password wrong` })
                    } else {
                        const payload = {
                            email: user.email
                        }
                        jwt.sign(payload, process.env.JWT_SECRET, (err, token) => {
                            if (err) {
                                res.status(500).json(err)
                            } else {
                                req.headers.token = token
                                res.status(201).json({
                                    name: `${user.first_name} ${user.last_name}`,
                                    id: user._id,
                                    token: token
                                })
                            }
                        })
                    }
                }
            })
    }

    static signInGoogle(req, res) {
        let userLoggedIn = null
        client.verifyIdToken({
            idToken: req.body.id_token,
            audience: process.env.CLIENT_ID
        })
            .then(respone => {
                // console.log(respone, '<<<<<<<<<<<<');
                userLoggedIn = respone.payload
                return userModel.findOne({ email: userLoggedIn.email })
            })
            .then(user => {
                if (user) {
                    res.status(200).json({
                        id: user._id,
                        message: 'User successfully logged in',
                        token: jwt.sign({
                            email: user.email
                        }, process.env.JWT_SECRET),
                        data: userLoggedIn
                    })
                } else {
                    return userModel.create({
                        first_name: userLoggedIn.given_name,
                        last_name: userLoggedIn.family_name,
                        email: userLoggedIn.email,
                        password: 'google',
                        source: 'google'
                    })
                        .then(newUser => {
                            res.status(201).json({
                                id: newUser._id,
                                message: 'New user created',
                                token: jwt.sign({
                                    email: userLoggedIn.email,
                                }, process.env.JWT_SECRET),
                                data: userLoggedIn
                            })
                        })
                }
            })
            .catch(err => {
                console.log(err);
                res.status(500).json(err)
            })
    }
}

module.exports = Controller