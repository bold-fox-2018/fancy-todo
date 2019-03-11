const User = require('../models/user')
const Todo = require('../models/todo')

module.exports = {
    findAll: function (req, res) {
        let obj = {}
        if (req.query.search) {
            obj = {
                userId: req.query.search
            }
        }
        Todo
            .find(obj)
            .then(allTodo => {
                // console.log(allTodo)
                res.status(200).json(allTodo)
            })
            .catch(err => {
                console.log('ERROR!!!!!')
                res.status(404).json({
                    msg: 'not found'
                })
            })
        // }
    },

    findOne: function (req, res) {
        // console.log(req.query ,'dalem controller findone')
        Todo
            .findById(req.query.id)
            .then(data => {
                res.status(200).json(data)
            })
            .catch(err => {
                console.log('ERROR!!!!!')
                res.status(404).json({
                    msg: 'not found'
                })
            })
    },

    createTodo: function (req, res) {
        Todo
            .create({
                name: req.body.name,
                description: req.body.description,
                status: 'false',
                due_date: req.body.due_date,
                userId: req.body.userId
            })
            .then(createdNewTodo => {
                res.status(201).json(createdNewTodo)
            })
            .catch(err => {
                console.log('ERROR!!!!!')
                res.status(404).json({
                    msg: 'not found'
                })
            })

    },

    updateTodo: function (req, res) {
        console.log(req.query)
        console.log(req.body)
        Todo
            .findOneAndUpdate(req.query.id, req.body)
            .then(updatedData => {
                res.status(201).json(updatedData)
            })
            .catch(err => {
                console.log(err)
                res.status(404).json({
                    msg: 'ERROR!!!'
                })
            })
    },

    deleteTodo: function (req, res) {
        Todo
            .findOneAndDelete(req.query.id)
            .then(deletedTodo => {
                res.status(200).json(deletedTodo)
            })
            .catch(err => {
                console.log(err)
                res.status(404).json({
                    msg: 'ERROR!!!'
                })
            })
    }
}