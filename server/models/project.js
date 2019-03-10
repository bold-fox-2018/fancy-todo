const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  todos: [{type: mongoose.Schema.ObjectId, ref: 'Todo'}],
  members: [{type: mongoose.Schema.ObjectId, ref: 'User'}],
  invite: [{type: mongoose.Schema.ObjectId, ref: 'User'}]
})

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;