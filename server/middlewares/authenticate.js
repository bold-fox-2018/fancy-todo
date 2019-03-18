const jwt = require('jsonwebtoken')
const verify = require('../helpers/verify')
require('dotenv').config()
module.exports = (req,res, next)=>{
    // console.log(req.body, 'req.body')
    // console.log(req.headers, 'req.headers')
    // console.log(req.headers.token)
    if (req.headers.hasOwnProperty('accesToken')) {
        try {
            console.log('masok')
            verify(req.headers.token)
            next()
          } catch(err) {
            res.status(400).json({
                message: 'Invalid token!'
            })
          }
    } else {
        res.status(400),json({
            message: 'Invalid token!'
        })
    }
}