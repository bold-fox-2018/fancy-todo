const Todo = require('../models/todo')
const User = require('../models/user')

class Controller {
    static todolist(req, res) {
        Todo
        .find({
            user: req.decoded.id
        })
        .sort({
            createdAt: -1
        })
        .then(todos => {
            res
                .status(200)
                .json(todos)
        })
        .catch(err => {
            console.log(err)
            res
                .status(500)
                .json({
                    msg: `Internal Server Error`,
                    err: err
                })
        })
    }

    static addTodo(req, res) {
        Todo.create({
            name: req.body.name,
            description: req.body.description,
            due_date: req.body.due_date,
            user: req.decoded.id,
            urgency: req.body.urgency
        })
        .then(newTodo => {
            console.log(newTodo)
            res
            .status(201)
                .json({
                    msg: `New Todo has been created`,
                    newTodo
                })     
        })
        .catch(err => {
            res
                .status(500)
                .json({
                    msg: `Internal Server Error`,
                    err
                })            
        })
    }
    
    static delete(req, res) {
        Todo
        .findById(req.params.id)
        .then(todo => {
            console.log(todo)
            if (todo.user == req.decoded.id) {
                return Todo.deleteOne({
                    _id: req.params.id
                })
                .then(deleted => {
                    res
                        .json({
                            msg: `Todo has been removed`
                        })
                })                 
            } else {
                res
                    .status(401)
                    .json({
                        msg: `Unauthorized Access!`
                    })
            }
        })
        .catch(err => {
            console.log(err)
            res
                .status(500)
                .json({
                    msg: `Internal Server Error`,
                    err: err
                })       
        })
    }
    
    static findTodo(req, res) {
        console.log(req.params.id)
        Todo
            .findById(req.params.id)
            .populate('user')
            .then(todo => {
                console.log(todo, '====')
                if (todo.user._id != req.decoded.id) {
                    res
                        .status(401)
                        .json({
                            msg: `Unauthorized Access`
                        })
                } else {
                    res
                        .status(200)
                        .json(todo)
                }
            })
            .catch(err => {
                console.log(err)
                res
                    .status(500)
                    .json({
                        msg: `Internal Server Error`,
                        err: err
                    })   
            })
    }

    static update(req, res) {
        Todo
            .findById(req.params.id)
            .then(todo => {
                if (todo.user != req.decoded.id) {
                    res
                        .status(401)
                        .json({
                            msg: `Unauthorized Access`
                        })
                } else {
                    let filter = ['name', 'description', 'status', 'due_date', 'urgency']
                    let updateFiltered = {}
                    for (const key in req.body) {
                        let findFilter = filter.includes(key)
                        if (findFilter) {
                            updateFiltered[key] = req.body[key]
                        }
                    }
                    updateFiltered.updatedAt = new Date
                    console.log(updateFiltered)
                    return Todo
                        .findOneAndUpdate({
                            _id: req.params.id,
                        }, updateFiltered, {
                                new: true
                            }
                        )
                        .then(newUpdate => {
                            res
                                .status(200)
                                .json({
                                    msg: 'Todo successfully been updated',
                                    data: newUpdate
                                })
                        })
                }
            })
            .catch(err => {
                console.log(err)
                res
                    .status(500)
                    .json({
                        msg: `Internal Server Error`,
                        err: err
                    })   
            })
    }
}

module.exports = Controller