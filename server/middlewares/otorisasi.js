const User = require('../models/user')
const Project = require('../models/project')
const Todo = require('../models/todo')

module.exports = {
    taskAuthorization(req, res, next) {
        console.log(req.params.id)
        console.log(req.decoded)
        Todo
            .find({
                user: req.decoded.id
            })
            .then(({data}) => {
                console.log(data)
            })
            .catch(err => {
                console.log(err)
            })
    },
}