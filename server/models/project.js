
const mongoose = require('mongoose')
const Schema = mongoose.Schema


const projectSchema = new Schema({
    name : {
        type: String,
        required: true
    },
    description : {
        type: String,
        required: true
    },
    admin : { type: Schema.Types.ObjectId, ref: 'User' },
    dueDate : {
        type: Date,
        required: true
    },
    createdAt : {
        type : Date, 
        default : Date.now
    },
    members : [{ type: 'ObjectId', ref: 'User' }],
    todoList : [{ type: 'ObjectId', ref: 'Todo' }]

})


const Project = mongoose.model('Project', projectSchema)

module.exports = Project