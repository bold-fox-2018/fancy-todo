const User = require('../models/user')
const bcrypt = require('../helpers/bcrypt')
const jwt = require('jsonwebtoken')
const env = require('dotenv')
const googleDecoder = require('../helpers/googleDecoder')

env.config()

module.exports = {
    findAll: function (req, res) {
        User
            .find({})
            .then(userData => {
                res.status(200).json(userData)
            })
            .catch(err => {
                console.log('ERROR!!!!!')
                res.status(404).json({
                    msg: 'not found'
                })
            })
    },

    register: function (req, res) {
        // console.log(req.body)
        User
            .create({
                username: req.body.username,
                email: req.body.email,
                password: req.body.password
            })
            .then(createdUser => {
                res.status(201).json(createdUser)
            })
            .catch(err => {
                console.log("ERROR!!!!!")
                res.status(404).json({
                    msg: err.message
                })
            })
    },

    login: function (req, res) {
        //!! ==================FOR GOOGLE SIGN IN USERS==================
        if (req.body.method === 'google') {

            // console.log('masok google sign in', req.body)

            let loggedInUserData = ''

            googleDecoder(req.body.id_token)
                .then(userData => {
                    loggedInUserData = userData
                    return User
                        .find({
                            username: userData.sub
                        })
                })
                .then(dataFound => {
                    // console.log(loggedInUserData)
                    if (dataFound.length === 0) {
                        return User
                            .create({
                                username: loggedInUserData.sub,
                                email: loggedInUserData.email,
                                password: 'google'
                            })
                    } else {
                        // console.log('================',dataFound[0].id, 'user lama=============')
                        jwt.sign({ loggedInUserData }, process.env.SECRET_KEY, (err, token) => {
                            res.status(200).json({
                                token,
                                userId: dataFound[0].id

                            })
                        })
                    }
                })
                .then(newUserCreated => {
                    return User
                        .find({
                            username: loggedInUserData.sub
                        })
                })
                .then(foundNewUser => {
                    // console.log('sukses bikin user baru dan cari user baru dengan idnya===================',foundNewUser)
                    jwt.sign({ newUserCreated }, process.env.SECRET_KEY, (err, token) => {
                        res.status(200).json({
                            token,
                            userId: foundNewUser[0]._id
                        })
                    })
                })
                .catch(err => {
                    console.log("ERROR!!!!!")
                    res.status(404).json({
                        msg: err.message
                    })
                })

        } else {
            //!! ==================FOR NORMAL SIGN IN USERS==================
            // console.log("masok sign in website", req.body)
            User
                .find({
                    username: req.body.username
                })
                .then(foundUser => {
                    if (!foundUser[0]) {
                        throw new Error(`username / password wrong`)
                    } else {
                        if (bcrypt.compare(req.body.password, foundUser[0].password) === false) {
                            throw new Error(`username / password wrong`)
                        } else {
                            jwt.sign({ foundUser }, process.env.SECRET_KEY, (err, token) => {
                                res.status(200).json({
                                    token,
                                    userId: foundUser[0].id
                                })
                            })
                        }
                    }
                })
                .catch(err => {
                    console.log("ERROR!!!!")
                    res.status(404).json({
                        msg: err.message
                    })
                })
        }
    }
}