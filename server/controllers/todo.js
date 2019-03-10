const Todo = require('../models/todo')
const Project = require('../models/project')

module.exports = {
    create: (req, res) => {
        let newTodo = {
            name: req.body.name,
            description: req.body.description,
            due_date: req.body.due_date,
            users: req.user.id
        }
        if (req.body.project) {
            newTodo.project = req.body.project
        }
        Todo
            .create(newTodo)
            .then(todo => {
                if (req.body.project) {
                    return Project
                        .findById(req.body.project)
                        .then(project => {
                            project.todos.push(todo._id)
                            return project.save()
                        })
                        .then(savedProject => {
                            res.status(200).json({ todo, savedProject })
                        })
                } else {
                    res.status(201).json(todo)
                }
            })
            .catch(err => {
                res.status(500).json({ message: `internal server error`, err })
            })
    },
    findAll: (req, res) => {
        let query = {
            users: req.user.id
        }
        if (req.query.name) {
            query = {
                $and: [
                    {
                        users: req.user.id
                    }, {
                        name: {
                            $regex: '.*' + req.query.name + '.*',
                            $options: 'i'
                        }
                    }
                ]
            }
        }
        Todo
            .find(query).populate('users').populate('project')
            .then(todos => {
                if (!todos) res.status(404).json({ message: 'not found' })
                else {
                    res.status(200).json(todos)
                }
            })
            .catch(err => {
                res.status(500).json({ message: `internal server error`, err })
            })
    },
    findOne: (req, res) => {
        Todo
            .findById(req.params.id)
            .then(todo => {
                if (!todo) res.status(404).json({ message: 'todos not found' })
                else {
                    res.status(200).json(todo)
                }
            })
            .catch(err => {
                res.status(500).json({ message: 'internal server error', err })
            })
    },
    update: (req, res) => {
        Todo
            .findOneAndUpdate({ _id: req.params.id }, { $set: req.body }, { new: true })
            .then(todo => {
                if (!todo) res.status(404).json({ message: 'todos not found' })
                else {
                    res.status(200).json(todo)
                }
            })
            .catch(err => {
                res.status(500).json({ message: 'internal server error', err })
            })
    },
    delete: (req, res) => {
        Todo
            .findOne({ _id: req.params.id })
            .then(todo => {
                if (!todo) res.status(404).json({ message: 'todos not found' })
                else {
                    if (todo.project) {
                        return Project
                            .findOneAndUpdate({ _id: todo.project }, {
                                $pull: {
                                    todos: todo._id
                                }
                            }, { new: true })
                            .then(project => {
                                res.status(200).json({ todo, project })
                            })
                    } else {
                        return Todo
                            .deleteOne({ _id: todo._id })
                            .then(todo => {
                                res.status(200).json(todo)
                            })
                    }
                }
            })
            .catch(err => {
                res.status(500).json({ message: 'internal server error', err })
            })

        // Todo
        //     .findOneAndDelete({_id : req.params.id})
        //     .then(todo => {
        //         if(!todo) res.status(404).json({message : 'todos not found'})
        //         else {
        //             if(todo.project){
        //                 return Project
        //                     .findById(todo.project)
        //                     .then(project => {
        //                         project.todos = project.todos.filter(todoElement => {
        //                             todoElement !== todo._id
        //                         })
        //                         return project.save()
        //                     })
        //                     .then(savedProject => {
        //                         res.status(200).json({todo , savedProject})
        //                     })
        //             }
        //             else {

        //             }
        //         }
        //     })
        //     .catch(err => {
        //         res.status(500).json({message:'internal server error', err})
        //     })
    }
}