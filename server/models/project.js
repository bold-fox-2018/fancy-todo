const mongoose = require('mongoose')
const Schema = mongoose.Schema

const projectSchema = new Schema({
    name : {
        type : String,
        required : [true, 'name must be filled']
    },
    description : String,
    due_date : Date,
    createdAt : {
        type : Date,
        default : new Date
    },
    users : [{
        type : Schema.Types.ObjectId,
        ref : 'User'
    }],
    todos : [{
        type : Schema.Types.ObjectId,
        ref : 'Todo'
    }]
})

const Project = mongoose.model('Project', projectSchema)

module.exports = Project