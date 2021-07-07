const mongoose = require('mongoose')
const Schema = mongoose.Schema

const todoSchema = new Schema({
    name : {
        type : String,
        required : [true, 'name must be filled']
    },
    description : String,
    status : String,
    due_date : Date,
    createdAt : {
        type : Date,
        default : new Date
    },
    users : {
        type : Schema.Types.ObjectId,
        ref : 'User'
    },
    project : {
        type : Schema.Types.ObjectId,
        ref : 'Project'
    },
    tag : {
        type : Schema.Types.ObjectId,
        ref : 'Tag'
    }
})

const Todo = mongoose.model('Todo', todoSchema)

module.exports = Todo