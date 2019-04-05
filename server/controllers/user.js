const bcrypt = require('bcrypt')
const jwt = require('../helpers/')
const dotenv = require('dotenv').config()
const Gclient_id = dotenv.client_id
const User = require('../models/user')
const {OAuth2Client} = require('google-auth-library')
const client = new OAuth2Client(Gclient_id)

class UserController{
    static homePage(req,res){
        jwt.verify(token)
        .then(({id})=>{
            return User.findOne({id})
        })
        .then(data=>{
            res.status(200).json(data)
        })
        .catch(err=>{
            res.status(500).json(err)
        })
    }
    static Gsignin(req,res){
        let email = null
        let password = null
        let name = null
        client.verifyIdToken({
            idToken:req.body.token,
            audience:Gclient_id
        })
        .then(({payload})=>{
            email = payload.email
            name = payload.given_name
            password = payload.given_name +'fancy'
            return User.findOne({
                email:payload.email
            })
        })
        .then(data=>{
            // console.log(data,`data hasil dari database`)
            if(data === null){
                return User.create({
                    email:email,
                    password:password
                })
            } else if (bcrypt.compareSync(password,data.password)){
                // console.log('msuk bcrypt')
                return jwt.create(data.id)
            } else {
               res.status(401).json({
                   message:'username/password is invalid'
               })
           }
        })
        .then(data=>{
            if (data === null) {
                return jwt.create(name+'fancy')   
            }else {
                return res.status(200).json(data)
            }
        })
        .then (data=>{
            res.status(200).json(data)
        })
        .catch(err=>{
            res.status(500).json({
                message: err.message
            })
        })
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
                return jwt.create(payload)
            } else {
               res.status(401).json({
                   message:'username/password is invalid'
               })
           }
        })
        .then(data=>{
            res.status(200).json(data)
        })
        .catch(err=>{
            res.status(500).json(err)
        })
    }

    static signUp(req,res){
        User.create(req.body)
        .then(()=>{
            res.status(200).json(data)
        })
        .catch(err=>{
            res.status(500).json(err)
        })
    }
}

module.exports = UserController