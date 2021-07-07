const Todo = require("../models/todos")

module.exports = {
  create: (req, res) => {
    let todo = new Todo({
      title: req.body.title,
      description: req.body.desc,
      endDate: req.body.date,
      status: JSON.parse(req.body.isCompleted),
      owner: req.user.id
    })

    todo.save(err => {
      if (!err) {
        res.status(201).json({
          message: `Success add task : ${req.body.title}`,
          todo: todo
        })
      } else {
        res.status(500).json({
          message: err.message
        })
      }
    })
  },

  show: (req, res) => {
    Todo.find({
      owner: req.user.id
    })
      .then(todo => {
        res.status(200).json({
          todo: todo
        })
      })
      .catch(err => {
        res.status(500).json({
          message: err.message
        })
      })
  },

  complete: (req, res) => {
    console.log(JSON.parse(req.body.isCompleted))
    Todo.findOneAndUpdate(
      {
        title: req.body.title,
        owner: req.user.id
      },
      {
        $set: {
          status: JSON.parse(req.body.isCompleted)
        }
      }
    )
      .then(todo => {
        res.status(200).json({
          todo: todo
        })
      })
      .catch(err => {
        res.status(500).json({
          message: err.message
        })
      })
  },

  update: (req, res) => {
    Todo.updateOne(
      {
        title: req.params.docktitle,
        owner: req.user.id
      },
      {
        $set: {
          title: req.body.title,
          description: req.body.desc,
          endDate: req.body.date
        }
      }
    )
      .then(() => {
        res.status(200).json({
          message: "Success update task"
        })
      })
      .catch(err => {
        res.status(500).json({
          message: err.message
        })
      })
  },

  remove: (req, res) => {
    Todo.deleteOne({
        title: req.params.docktitle,
        owner: req.user.id
    })
      .then(() => {
        res.status(200).json({
          message: "Delete task success"
        })
      })
      .catch(err => {
        res.status(500).json({
          message: err.message
        })
      })
  }
}