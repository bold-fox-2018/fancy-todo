const jwt = require('jsonwebtoken')
require('dotenv').config()
const Project = require('../models/project')


function isAdmin(req,res,next) {
    try {
        Project
            .findOne({ _id : String(req.params.id) })
            .then(project => {
                if(project.admin == req.body._id) {
                    next()
                } else {
                    res.status(402).json({message : 'not authorize'})
                }
            })
            .catch(err => {
                res.status(500).json({ message: 'internal server error', error: err })
            })

    } catch (err) {
        res.status(402).json({ message: "you're not authorize for this session" })
    }
}

module.exports = isAdmin