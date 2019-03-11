const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TodolistSchema = new Schema({
    title: {type: String},
    description: {type: String},
    status: {type: String},
    duedate: {type: Date},
    todouserid: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
    },
    {
        timestamps: true
})

const Todolist = mongoose.model('Todolist', TodolistSchema)

module.exports = Todolist