const Todo = require('../models/todo')
const YouTube = require('youtube-node')
const youtube = new YouTube()
youtube.setKey(process.env.YOUTUBE_API_KEY)

class TodoController {
    static listTodo(req, res) {
        Todo.find({
            userEmail: req.headers.email
        })
        .then(data => {
            if(data.length !== 0) {
                res.status(200).json(data)
            } else {
                res.status(200).json({
                    message: 'You have nothing Todo!'
                })
            }
        })
        .catch(err => {
            res.status(500).json(err.message)
        })
    }

    static newTodo(req, res) {
        Todo.create({ ...req.body })
        .then(result => {
            res.status(201).json(result)
        })
        .catch(err => {
            res.status(500).json(err.message)
        })
    }

    static updateTodo(req, res) {
        Todo.updateOne({
            _id: req.body.id
        }, {
            ...req.body
        }, {
            new: true
        })
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            res.status(500).json(err.message)
        })
    }

    static deleteTodo(req, res) {
        Todo.deleteOne({
            _id: req.body.id
        })
        .then(() => {
            res.status(200).json({
                message: 'Deleted'
            })
        })
        .catch(err => {
            res.status(500).json(err.message)
        })
    }

    static getVideo(req, res) {
        youtube.search(req.headers.description, 1, (err, result) => {
            if(err) {
                res.status(500).json(err.message)
            } else {
                res.status(200).json(result)
            }
        })
    }
}

module.exports = TodoController