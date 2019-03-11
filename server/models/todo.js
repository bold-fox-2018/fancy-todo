const mongoose = require('mongoose')
const axios = require('axios')
const Schema = mongoose.Schema
let googleCalendarApi = 'https://www.googleapis.com/calendar/v3/calendars/primary/events'

const todoSchema = new Schema({

    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: 'uncomplete'
    },
    dueDate: {
        type: Date,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    // points: {
    //     type: Number
    // },
    user: { type: 'ObjectId', ref: 'User' }
})


const Todo = mongoose.model('Todo', todoSchema)

module.exports = Todo