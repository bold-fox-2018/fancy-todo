const Todo = require('../models/todo')

function isTodoOwner(req, res, next) {
    Todo
        .findById(req.params.id)
        .then(todo => {
            if (req.user.id.toString() == todo.users.toString()) {
            // if (todo.users.includes(req.user.id)) {
                next()
            } else {
                res
                    .status(401)
                    .json({
                        msg: "unauthorized access",
                    })
            }
        })
}

module.exports = isTodoOwner

