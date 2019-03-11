const Users = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()


class UserController {

    static create(req, res) {
        Users
            .create({
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                email: req.body.email,
                password: req.body.password,
                source: 'regular'
            })
            .then(data => {
                res.status(201).json(data)
            })
            .catch(err => {
                res.status(500).json({ message: 'internal server error', error: err.message })
            })
    }

    static findAll(req, res) {
        Users
            .find({})
            .then(data => {
                res.status(200).json(data)
            })
            .catch(err => {
                res.status(500).json({ message: 'internal server error', error: err.message })
            })
    }

    static findOne(req, res) {
        Users
            .findOne({email : req.params.email})
            .populate('todoList')
            .then(data => {
                res.status(200).json(data)
            })
            .catch(err => {
                res.status(500).json({ message: 'internal server error', error: err.message })
            })
    }

    static login(req,res) {
        let user = ''
        Users
            .findOne({email : req.body.email})
            .then(userfind => {
                user = userfind
                if(user.length == 0) {
                    res.status(403).json({message : 'username salah'})
                } else {
                    return bcrypt.compare(req.body.password, user.password)
                    .then(result => {
                        if(result == true) {
                            res.status(200).json({
                                token : jwt.sign({
                                    email : user.email,
                                    id : user._id
                                },process.env.JWTTOKEN),
                                data : user
                            })
                        } else {
                            res.status(403).json({message : 'password salah'})
                        }
                    })
                }
            })
            .catch(err => {
                res.status(500).json({message : 'internal server error'})              
            })
    }
}


module.exports = UserController