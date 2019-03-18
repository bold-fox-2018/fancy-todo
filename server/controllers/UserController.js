const User = require('../models/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
require('dotenv').config()
// console.log(process.env.SECRET_KEY)

class UserController {

    static signup(req,res) {
        const { email, password } = req.body

        let obj = {
            email,
            password
        }
        
        User
            .findOne({
                email: obj.email
            })
            .then(user=>{
                if (user) {
                    res.status(500).json({
                        message: 'Email already exists!'
                    })
                } else {
                    return User.create(obj)
                        .then(newuser=>{
                            let payload = {
                                email: newuser.email
                            }
                            const token = jwt.sign(payload, process.env.SECRET_KEY)
                            res.status(201).json({
                                token: token 
                            })
                        })
                }
            })
            .catch(err=>{
                res.status(500).json(err)
            })
    }

    static signin(req, res) {
        const { email, password } = req.body

        User.findOne({
            email: email
        })
        .then(user=>{
            const isValid = bcrypt.compareSync(password, user.password)

            if (isValid) {
                // console.log('sama passwordnya')
                let payload = {
                    email: user.email
                }
                
                const token = jwt.sign(payload, process.env.SECRET_KEY)
                res.status(200).json({token: token})
                // console.log(token)
            }
        })
        .catch(err=>{
            res.status(500).json(err)
        })
    }

    static logout() {}

}

module.exports = UserController