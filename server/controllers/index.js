const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

class Controller{
    static homePage(req,res){

    }

    static signIn(req,res){
        
        const {email , password} = req.body
        User.findOne({email:email})
        .then(data=>{
            if (data === null) {
                // console.log(data.password,'password yang mau dikomparasi')
                res.status(404).json({
                    message:'username/password is invalid'
                })
            } else if (bcrypt.compareSync(password,data.password)){
                const payload = {
                    id:data.id
                }
                const token = jwt.sign(payload,'secret')
                res.status(200).json(token)
            } else {
               res.status(401).json({
                   message:'username/password is invalid'
               })
           }
        })
        .catch(err=>{
            res.status(500).json(err)
        })
    }

    static signUp(req,res){
        User.create(req.body)
        .then(data=>{
            console.log(data.password)
            res.status(200).json(data)
        })
        .catch(err=>{
            res.status(500).json(err)
        })
    }
}
module.exports = Controller