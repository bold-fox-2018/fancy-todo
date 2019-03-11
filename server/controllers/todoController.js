const todoModel = require('../models/todoModel')
const mongoose = require('mongoose')

class Controller {
    static findAll(req, res) {
        let condition = {}
        if (req.query.search) {
            condition = {
                user_id: mongoose.Types.ObjectId(req.query.search)
            }
        }
        todoModel
            .find(condition)
            .then(todos => {
                if (todos.length == 0) {
                    res.status(200).json({
                        message: `It seems like you don't have any todos to be done. Try to add some.`
                    })
                } else {
                    res.status(200).json(todos)
                }
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }

    static findById(req, res) {
        todoModel
            .findById(req.params.id)
            .then(todo => {
                res.status(200).json(todo)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }

    static create(req, res) {
        todoModel
            .create({
                name: req.body.name,
                description: req.body.description,
                status: `uncompleted`,
                due_date: req.body.due_date,
                user_id: req.body.user_id
            })
            .then(newTodo => {
                res.status(201).json(newTodo)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }

    static update(req, res) {
        todoModel
            .findByIdAndUpdate(mongoose.Types.ObjectId(req.params.id), { ...req.body }, { new: true })
            .then(updatedUser => {
                res.status(200).json(updatedUser)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }

    static delete(req, res) {
        todoModel
            .findByIdAndDelete(mongoose.Types.ObjectId(req.params.id))
            .then(deleted => {
                res.status(200).json(deleted)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }

}

module.exports = Controller