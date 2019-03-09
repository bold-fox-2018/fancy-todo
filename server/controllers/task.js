const Task = require('../models/task');

module.exports = {
  createTask(req, res) {
    let newTask = {
      name: req.body.name,
      description: req.body.description,
      status: req.body.status,
      due_date: req.body.due_date,
      owner: req.auth_user.id
    };
    Task.create(newTask)
      .then(task => {
        res.status(201).json(task);
      })
      .catch(err => {
        let error = err.errors;
        if (error.hasOwnProperty('name')) {
          res.status(400).json(error.name.message);
        } else if (error.hasOwnProperty('description')) {
          res.status(400).json(error.description.message);
        } else if (error.hasOwnProperty('status')) {
          res.status(400).json(error.status.message);
        } else if (error.hasOwnProperty('due_date')) {
          res.status(400).json(error.due_date.message);
        } else {
          res.status(500).json(error);
        }
      });
  },
  findTask(req, res) {
    Task
      .findById(req.params.id)
      .populate({ path: 'owner', select: 'name' })
      .then(task => {
        if (task) {
          res.json(task);
        } else {
          res.status(404).json({ message: 'Task not found' });
        }
      })
      .catch(err => {
        res.status(500).json(err);
      });
  },
  findAllTask(req, res) {
    Task
      .find({})
      .populate({ path: 'owner', select: 'name' })
      .then(tasks => {
        if (tasks.length) {
          res.json(tasks);
        } else {
          res.status(404).json({ message: 'Task not found' });
        }
      })
      .catch(err => {
        res.status(500).json(err);
      });
  },
  async updateTask(req, res) {
    try {
      let task = await Task.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
      task.updated_at = Date.now();
      task.save();
      res.json({
        task,
        message: 'Task updated!'
      });
    } catch (error) {
      res.status(500).json(error);
    }
  },
  deleteTask(req, res) {
    Task
      .findByIdAndDelete(req.params.id)
      .then(task => {
        if (task) {
          res.json({
            task,
            message: 'Task deleted!'
          });
        } else {
          res.status(404).json({ message: 'Task not found' });
        }
      })
      .catch(err => {
        res.status(500).json(err);
      });
  }
};

