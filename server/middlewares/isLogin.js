//William
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const localStorage = require('localstorage')

module.exports = function (req, res, next) {
    if(req.headers.hasOwnProperty('token')) {
        try {
            const decoded = jwt.verify(req.headers.token, process.env.SECRETKEY)
            console.log("Hasil verifikasi JWT", decoded)
            if(decoded != null) {
                User.findOne({
                    email: decoded.email
                })
                .then(user => {
                    console.log("Hasil find after verifikasi JWT", user)
                    req.loggedInUser = user
                    next()
                    // if(user != null) {
                    //     decoded = user
                    //     req.loggedInUser = decoded
                    //     // return req.decoded
                    //     console.log("data authentication siap kirim", req.decoded)
                    //     next()
                    // } else if (user == null) {
                    //     res.status(400).json({
                    //         msg: 'ERROR: User Not Found'
                    //     })
                    // }
                })
                .catch (err => {
                    res.status(500).json({
                        msg: `ERROR: ${err}`
                    })
                })
            }
        } catch (err) {
            res.status(400).json({
                message: 'Invalid Token'
            })
        }
    } else {
        res.status(400).json({
            message: 'Please provide token'
        })
    }
}

// function isLogin (req, res, next) {
//     if(req.headers.hasOwnProperty('token')) {
//         console.log("masuk authentication (isLogin) process ==>", req.headers.token)
//         jwt.verify(req.headers.token, process.env.SECRETKEY, (err,decoded) => {
//             if(!err) {
//                 console.log("Verifikasi JWT tidak error", decoded)
//                 User.find({
//                     email: decoded.email
//                 })
//                 .then(user => {
//                     console.log("Hasil find after verifikasi JWT", user)
//                     if(user) {
//                         decoded = user
//                         req.decoded = decoded
//                         // return req.decoded
//                         console.log("data authentication siap kirim", decoded)
//                         next()
//                     } else if (user == null) {
//                         res.status(400).json({
//                             msg: 'ERROR: User Not Found'
//                         })
//                     }
//                 })
//                 .catch (err => {
//                     res.status(500).json({
//                         msg: `ERROR: ${err}`
//                     })
//                 })
//             } else {
//                 res.status(500).json({
//                     msg: 'ERROR: Token is mising'
//                 })
//             }
            
//         })
//     }
// }

// module.exports = isLogin