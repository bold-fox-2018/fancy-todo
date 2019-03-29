const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const validator = require('validator'); //package validator

const todoSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    status: {
        type: String,
        default: 'unchecked',
        enum: ['checked', 'unchecked']
    },
    due_date: {
        type: Date,
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    urgency: {
        type: String,
        required: true,
        default: 'regular',
        enum: ['regular', 'important', 'urgent']
    },
    createdAt: {
        type: Date,
        required: true,
        default: new Date
    },
    updatedAt: {
        type: Date,
        required: true,
        default: new Date
    }
  })

todoSchema.pre('save', function(next) {
    let currentTime = Date.now()
    let inputDate = Date.parse(this.due_date)
    if (inputDate < currentTime) {
        throw `Invalid Due Date!`
    } else {
        next()
    }
})

const Todo = mongoose.model('Todo', todoSchema)

module.exports = Todo