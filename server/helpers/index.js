const jwt = require('jsonwebtoken')

class Token{
    static create(id){
        return new Promise(function(resolve,reject){
            jwt.sign(id,process.env.secret,function(err,data){
                if (!err) {
                    resolve(data)
                } else {
                    reject(data)
                }
            })
        })
    }
    static verify(token){
        return new Promise (function(resolve,reject){
            jwt.verify(token,process.env.secret,function(err,data){
                if(!err){
                    resolve(data)
                }else {
                    reject (err)
                }
            })
        })
    }
}
module.exports = Token