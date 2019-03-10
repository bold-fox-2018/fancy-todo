const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = new Schema({
    users: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
        default: '...'
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    todos: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Todo'
        }
    ],
    invitedUsers: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }] //invited users untuk user yang belum accept invitation project dari creator
})

const Project = mongoose.model('Project', projectSchema)

module.exports = Project