const User = require('../models/user')
const { OAuth2Client } = require('google-auth-library')
const client = new OAuth2Client(process.env.CLIENT_ID)
const jwt = require('../helpers/jwt')
const bcrypt = require('../helpers/bcrypt')

class UserController {
    static signUp(req, res) {
        const { name, email, password } = req.body
        User.create({
            name,
            email,
            password
        })
        .then(result => {
            res.status(201).json(result)
        })
        .catch(err => {
            res.status(500).json(err.message)
        })
    }

    static signIn(req, res) {
        const { email, password } = req.body
        User.findOne({
            email
        })
        .then(data => {
            if(data && bcrypt.compare(password, data.password) === true) {
                const { name } = data
                const token = jwt.sign({ email, name })
                res.status(200).json({
                    message: 'Login successful',
                    email,
                    token
                })
            } else {
                res.status(400).json({
                    message: 'Wrong email / password!'
                })
            }
        })
        .catch(err => {
            res.status(500).json(err.message)
        })
    }

    static googleSignIn(req, res) {
        client.verifyIdToken({
            idToken: req.body.idToken,
            audience: process.env.GOOGLE_CLIENT_ID
        })
        .then(ticket => {
            const { email, name } = ticket.getPayload()
            return User.findOneAndUpdate({
                email
            },{
                name,
                email,
                password: name.slice(0, 3) + email.slice(0, 3)
            }, {
                new: true,
                upsert: true
            })
        })
        .then(result => {
            const { email, name } = result
            const token = jwt.sign({ email, name })
            res.status(200).json({
                message: 'Login successful',
                name,
                email,
                token
            })
        })
        .catch(err => {
            res.status(500).json(err.message)
        })
    }

    static userList(req, res) {
        User.find({})
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            res.status(500).json(err.message)
        })
    }

    static tokenProfile(req, res) {
        const { email, name } = req.headers
        res.status(200).json({
            name,
            email
        })
    }
}

module.exports = UserController