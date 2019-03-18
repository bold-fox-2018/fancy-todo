const Todo = require('../models/Todo')
const User = require('../models/User')
const verify = require('../helpers/verify')


class TodoController {

    static findAll(req,res) {
        Todo.find()
            .then(todos=>{
                res.status(200).json(todos)
            })
            .catch(err=>{
                res.status(500).json(err)
            })
    }

    static findOne(req,res) {
        // const { body } = req.body
        // console.log(req.body)
        // console.log(req.headers.token)
        const isValid = verify(req.headers.token)
        // console.log(isValid)
        if (isValid) {

            User.findOne({
                email: isValid.email
                })
                .populate('todos')
                .then(todo=>{
                    res.status(200).json(todo.todos)
                })
                .catch(err=>{
                    res.status(500).json(err)
                })
        } else {
            console.log('Invalid token!')
        }
    }

    static create(req,res) {
        // console.log(req.body)
        const isValid = verify(req.body.token)
        // console.log(isValid)
        if (isValid) {
            const { body } = req
            let obj = {
                name: body.name,
                description: body.description,
                status: body.status,
                due_date: Date(body.due_date)
            }
            // console.log(obj)
            let todos = null
            Todo.create(obj)
                .then(newtodos=>{
                    todos = newtodos
                    // res.status(201).json(newtodos)
                    return User.updateOne({
                        email: isValid.email
                    },{$push: {todos: newtodos._id}},{new: true})
                })
                .then(data=>{
                    res.status(201).json(todos)
                })
                .catch(err=>{
                    res.status(500).json(err)
                })
        } else {
            console.log('Invalid token!')
        }
    }

    static update(req,res) {
        // console.log(req.params)
        const { params } = req
        const { name, description, status, due_date } = req.body

        let obj = {
            name,
            description,
            status,
            due_date
        }

        Todo.findOneAndUpdate({ _id: params.id }, { $set: obj })
            .then(oldtodo=>{
                res.status(200).json(oldtodo)
            })
            .catch(err=>{
                res.status(500).json(err)
            })
    }

    static delete(req, res) {
        // console.log(req.params)
        const { params } = req
        Todo.deleteOne({
            _id: params.id
        })
        .then(todo=>{
            res.status(200).json(todo)
        })
        .catch(err=>{
            res.status(500).json(err)
        })
    }

}

module.exports = TodoController