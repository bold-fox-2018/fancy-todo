const User = require('../models/user')
const Project = require('../models/project')
const Todo = require('../models/todo.js')

function profileAuthorization(req, res, next) {
    User
        .findById(req.params.id)
        .then(({data}) => {
            console.log(data)
            // if (data.id != req.decoded.id) {
            //     res
            //         .status(401)
            //         .json({
            //             msg: `Unauthorized Access`
            //         })
            // } else {
            //     next()
            // }
        })
        .catch(err => {
            res
                .status(400)
                .json({
                    msg: `Bad request`,
                    err
                })
        })
}

//is authenticated user also the owner of the task
function taskAuthorization(req, res, next) {
    console.log(req.decoded)
    Todo
        .findOne({
            user: req.decoded.id
        })
        .then(todo => {
            if (req.decoded.id != todo.user) {
                res
                    .status(401)
                    .json({
                        msg: `Unauthorized access`
                    })
            } else {
                next()
            }
        })
        .catch(err => {
            console.log(err)
        })
}

// is authenticated user also the owner of the project
function projectAuthorization(req, res, next) {
    Project
        .findOne({
            users: req.decoded.id
        })
        .then(project => {
            if (req.decoded.id != project.creator) {
                res
                    .status(401)
                    .json({
                        msg: `Unauthorized access`
                    })
            } else {
                next()
            }
        })
        .catch(err => {
            console.log(err)
        })
}

module.exports = { profileAuthorization, taskAuthorization, projectAuthorization }