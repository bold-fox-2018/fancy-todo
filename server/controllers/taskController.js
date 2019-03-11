const taskModel = require('../models/task')

const jwt = require('jsonwebtoken')
const ENV = require('dotenv')
ENV.config()

class Task {
    static getAll(req, res) {
        const token = req.headers.token
        const decoded = jwt.verify(token, process.env.SECRET)
        const id= decoded.id
        taskModel.find({
            UserId: id
        })
        .then(function(data) {
            res.status(200).json({ data })
        })
        .catch(function(e) {
            res.status(500).json({
                error: e.message
            })
        })
    }

    static addnew(req, res) {
        const { taskName, priority, startDate, dueDate } = req.body
        const token = req.headers.token
        const decoded = jwt.verify(token, process.env.SECRET)
        const id= decoded.id
        taskModel.create({
            taskName: taskName,
            priority: priority,
            status: 'false',
            startDate: new Date(`${startDate}`),
            dueDate: new Date(`${dueDate}`),
            UserId: id
        })
        .then(function({ data }) {
            res.status(201).json(data)
        })
        .catch(function(e) {
            res.status(500).json({
                error: e.message
            })
        })
    }

    static update(req, res) {
        const { idTask, taskName, priority, status, startDate, dueDate } = req.body
        let update = { $set:
            {
            taskName: taskName,
            priority: priority,
            status: status, 
            startDate: new Date(startDate),
            dueDate: new Date(dueDate)
        }}
        let id = { _id: idTask}
        taskModel.findByIdAndUpdate(id, update, { new: true })
        .then(function(data) {
            res.status(200).json(data)
        })
        .catch(function(e) {
            res.status(500).json({
                error: e.message
            })
        })
    }

    static delete(req, res) {
        const taskId = req.params.id
        let task = { _id: taskId }
        taskModel.findByIdAndDelete(task)
        .then(function(data) {
            res.status(200).json(data)
        })
        .catch(function(e) {
            res.status(500).json({
                error: e.message
            })
        })
    }
}

module.exports = Task