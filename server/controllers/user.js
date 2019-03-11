const user = require('../models/user')
const jwt = require('jsonwebtoken')
const ENV = require('dotenv')
ENV.config()
const decrypt = require('../helpers/decrypt')
class User {
    static register(req, res) {
        user.create({
                email: req.body.email,
                password: req.body.password
            })
            // const token = jwt.sign({ email: req.body.email }, process.env.SECRET)
            .then(function(newUser) {
                res.status(201).json(newUser)
            })
            .catch(function(err) {
                res.status(500).json(err)
            })
    }

    static login(req, res) {
        // console.log(req.body, 'req.body')
        user.findOne({
                email: req.body.email
            })
            .then(function(dataUser) {
                // console.log(dataUser, 'datauser')
                if (!dataUser) {
                    res.status(404).json({ message: 'Username / password wrong' })
                } else {
                    if (!decrypt(req.body.password, dataUser.password)) {
                        res.status(404).json({ message: 'Username / password wrong' })
                    } else {
                        // console.log(process.env)
                        const token = jwt.sign({ email: dataUser.email }, process.env.SECRET)
                            // console.log(token, 'ini token')
                        res.status(200).json(token)
                    }
                }
            })
            .then(function(token) {
                res.status(200).json(token)
            })
            .catch(function(err) {
                // console.log(token)
                console.log(err)
                res.status(500).json(err)
            })
    }
}

module.exports = User