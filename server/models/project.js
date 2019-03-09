const mongoose = require('mongoose');
const Schmea = mongoose.Schema;
let memberSchema = require('../models/member');

let projectSchema = new Schmea({
  projectName: {
    type: String,
    required: [true, 'Project name is required']
  },
  projectLeader: {
    type: Schmea.Types.ObjectId,
    ref: 'user'
  },
  projectMember: [memberSchema]
});

projectSchema.pre('save', function(next) {
  if (String(this.projectMember[0].members) == String(this.projectLeader)) {
    this.projectMember[0].isVerified = true;
    next();
  }
});

let Project = mongoose.model('project', projectSchema);

module.exports = Project;