const todo = require('../models/todo')
const user = require('../models/user')
const jwt = require('jsonwebtoken')
const ENV = require('dotenv')
ENV.config()
class Todo {
    static read(req, res) {
        // console.log(req.headers)
        let real = jwt.verify(req.headers.token, process.env.SECRET)
        user.findOne({
                email: real.email
            }).populate('todos')
            .then(function(user) {
                res.status(200).json(user)
                    // console.log(user)
            })
            .catch(function(err) {
                res.status(500).json(500)
            })
    }

    static create(req, res) {
        const real = jwt.verify(req.headers.token, process.env.SECRET)
            // console.log(req.body)
        todo.create({
                name: req.body.name,
                description: req.body.description,
                status: false,
                dueDate: req.body.dueDate
            })
            .then(function(newTodo) {
                return user.update({
                    email: real.email
                }, {
                    $push: {
                        todos: newTodo._id
                    }
                }, {
                    new: true
                })
            })
            .then(function(newTodo) {
                res.status(201).json(newTodo)
            })
    }

    static update(req, res) {
        todo.findOneAndUpdate({
                _id: req.query.id
            }, {
                $set: req.body
            })
            .then(function(data) {
                res.status(200).json(data)
            })
            .catch(function(err) {
                res.status(500).json(err)
            })
    }

    static remove(req, res) {
        console.log('controller delet')

        console.log(req.params)
        todo.findOneAndDelete({
                _id: req.params.id
            })
            .then(function(data) {
                res.status(200).json(data)
            })
            .catch(function(err) {
                res.status(500).json(err)
            })
    }
}

module.exports = Todo