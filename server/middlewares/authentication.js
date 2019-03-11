const jwt = require('jsonwebtoken')
require('dotenv').config()

function auth(req,res,next){
    
    try {
        const decoded = jwt.verify(req.headers.token, process.env.JWTSECRET)
        req.user = {
            id : decoded.id,
            email : decoded.email
        }
        
        next()
    }
    catch (error){
        console.log(error)
        res.status(401).json({msg:`Unauthenticated User`})
    }
}

module.exports = auth