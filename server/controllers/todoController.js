const ToDo = require('../models/todo')
const User = require('../models/user')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

class TodoController {
    static create(req, res) {
        let new_todo = new ToDo({ description: req.body.description, status: false })
        new_todo
            .save()
            .then(data => {
                let decode = jwt.decode(req.headers.token)
                User
                    .findOneAndUpdate({ 
                        _id: decode.id 
                    },{
                        $push: { todo: mongoose.Types.ObjectId(newTodoList._id) }
                    })
                    .populate('todo')
                    .then(data => {
                        res.status(201).json({
                            message: 'Data has been updated',
                            data
                        })
                    })
                    .catch(err => {
                        res.status(400).json({
                            message: 'Failed to update data'
                        })
                    })
            })
    }

    static findAll(req, res) {
        let decode = jwt.decode(req.headers.token)
        User
            .findById({ _id: decode.id})
            .populate('todo')
            .then(data => {
                res.status(200).json(data)
            })
            .catch(err => {
                res.status(400).json(err.message)
            })
    }

    static update(req, res) {
        ToDo
            .findOneAndUpdate({
                _id: req.params.id
            },{
                status: req.body.status
            })
            .then(data => {
                res.status(200).json({
                    message: 'Success update Data',
                    data
                })
            })
            .catch(err => {
                res.status(400).json(err.message)
            })
    }

    static delete(req, res) {
        let decode = jwt.decode(req.headers.token)
        User
            .find({ _id: decode.id })
            .then(data => {
                data[0].todo.remove(req.params.id)
                ToDo
                    .findByIdAndRemove(req.params.id, (err, todo) => {
                        res.status(200).json({
                            message: 'Success delete data'
                        })
                    })
            })
            .catch(err => {
                res.status(400).json({
                    message: 'Failed delete Todo'
                })
            })
    }
}


module.exports = TodoController