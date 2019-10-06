const Project = require('../models/project')
const Todo = require('../models/todo')
const User = require('../models/user')

class Controller {
    static create(req, res) {
        let userInvited = [] //user yang sudah pasti akan dimasukkin ke field invitedUsers
        let userNotFound = [] //user yang tidak ketemu akan dikembalikan ke client untuk kemudian dikonfirmasi kembali
        let promiseUserInvited = []
        req.body.invitedUsers.split(' ').forEach(u => {
            promiseUserInvited.push(
                User
                    .findOne({
                        username: u
                    })
            )
        });
        Promise.all(promiseUserInvited)
        .then(users => {
            users.forEach((notFound, index) => {
                if (!notFound) {
                    userNotFound.push(req.body.invitedUsers.split(' ')[index])
                }
            })
            userInvited = users.filter(e => e !== null)
            userInvited.forEach(usr => {
                let idx = req.body.invitedUsers.split(' ').findIndex(e => e === usr.username)
                req.body.invitedUsers = req.body.invitedUsers.split(' ').splice(idx, 1).join(' ')
            })
            userInvited = userInvited.map(e => e._id)
            
            return Project
                .create({
                    users: req.decoded.id,
                    name: req.body.name,
                    description: req.body.description,
                    creator: req.decoded.id,
                    invitedUsers: userInvited
                })
                .then(newProject => {
                    res
                        .status(201)
                        .json({
                            msg: `New Project has been created`,
                            newProject,
                            userNotFound
                        })
                })
        })
        .catch(err => {
            console.log(err)
            res
                .status(500)
                .json({
                    msg: `Internal server error`,
                    err
                })
        })
    }

    static allProjects(req, res) {
        Project
            .find({
                users: req.decoded.id
            })
            // .populate('users')
            // .populate('creator')
            .populate('todos')
            .sort({
                createdAt: -1
            })
            .then(projects => {
                res
                    .status(200)
                    .json(projects)
            })
            .catch(err => {
                console.log(err)
                res
                    .status(500)
                    .json({
                        msg: `Internal server error`,
                        err
                    })
            })
    }

    static gotInvitationQuestionMark(req, res) {
        Project
            .find({
                invitedUsers: req.decoded.id
            })
            .populate('creator')
            .then(projects => {
                res
                    .status(200)
                    .json(projects)
            })
            .catch(err => {
                console.log(err)
                res
                    .status(500)
                    .json({
                        msg: `Internal server error`,
                        err
                    })
            })
    }

    static getProject(req, res) {
        Project
            .findById(req.params.id)
            .populate('users')
            .populate('todos')
            .populate('creator')
            .then(project => {
                res
                    .status(200)
                    .json(project)
            })
            .catch(err => {
                res
                .status(500)
                    .json({
                        msg: `Internal server error`,
                        err
                    })
            })
    }

    static inviteMember(req, res) {
        let userInvited = [] //user yang sudah pasti akan dimasukkin ke field invitedUsers
        let userNotFound = [] //user yang tidak ketemu akan dikembalikan ke client untuk kemudian dikonfirmasi kembali
        let promiseUserInvited = []
        req.body.invitedUsers.split(' ').forEach(u => {
            promiseUserInvited.push(
                User
                    .findOne({
                        username: u
                    })
            )
        });
        Promise.all(promiseUserInvited)
        .then(users => {
            users.forEach((notFound, index) => {
                if (!notFound) {
                    userNotFound.push(req.body.invitedUsers.split(' ')[index])
                }
            })
            userInvited = users.filter(e => e !== null)
            userInvited.forEach(usr => {
                let idx = req.body.invitedUsers.split(' ').findIndex(e => e === usr.username)
                req.body.invitedUsers = req.body.invitedUsers.split(' ').splice(idx, 1).join(' ')
            })
            userInvited = userInvited.map(e => e._id)
            
            return Project
                .findOneAndUpdate({
                    _id: req.params.id
                }, {
                    invitedUsers: userInvited
                }, {
                    new: true
                })
                .then(updated => {
                    res
                        .status(201)
                        .json({
                            msg: `New Project has been updated`
                        })
                })
        })
        .catch(err => {
            console.log(err)
            res
                .status(500)
                .json({
                    msg: `Internal server error`,
                    err
                })
        })
    }

    static removeTodo(req, res) {
        Project
            .deleteOne({
                _id: req.params.id
            }, {
                todos: req.params.todoId
            })
            .then(deleted => {
                res
                    .status(200)
                    .json({
                        msg: `Todo has been successfully removed`
                    })
            })
            .catch(err => {
                res
                .status(500)
                    .json({
                        msg: `Internal server error`,
                        err
                    })
            })
    }

    static addTodo(req, res) {
        Todo
            .create({
                name: req.body.name,
                description: req.body.description,
                due_date: req.body.due_date,
                // user: req.decoded.id,
                urgency: req.body.urgency
            })
            .then(newTodo => {
                return Project
                        .findOneAndUpdate({
                            _id: req.params.id
                        }, {
                            $push: {
                                todos: newTodo._id
                            }
                        })
                        .then(project => {
                            res
                                .status(200)
                                .json(project)
                        })
            })
            .catch(err => {
                res
                .status(500)
                    .json({
                        msg: `Internal server error`,
                        err
                    })
            })
    }

    static addUser(req, res) {
        Project
            .findOneAndUpdate({
                _id: req.params.id
            }, {
                $push: {
                    invitedUsers: req.body.users
                }
            }, { new: true })
            .then(done => {
                res
                    .status(200)
                    .json(done)
            })
            .catch(err => {
                res
                .status(500)
                    .json({
                        msg: `Internal server error`,
                        err
                    })
            })
    }

    static userAcceptingInvitation(req, res) {
        Project
            .findOneAndUpdate({
                _id: req.params.id
            }, {
                $pull: {
                    invitedUsers: req.decoded.id
                },
                $push: {
                    users: req.decoded.id
                }
            }, { new: true })
            .then(done => {
                res
                    .status(200)
                    .json(done)
            })
            .catch(err => {
                console.log(err)
                res
                    .status(500)
                    .json({
                        msg: `Internal server error`,
                        err
                    })
            })
    }

    static findTodo(req, res) {
        console.log(req.params.id)
        Todo
            .findById(req.params.todoId)
            .then(todo => {
                res
                    .status(200)
                    .json(todo)
            })
            .catch(err => {
                console.log(err)
                res
                    .status(500)
                    .json({
                        msg: `Internal Server Error`,
                        err: err
                    })   
            })
    }

    static delete(req, res) {
        Todo
            .deleteOne({
                _id: req.params.id
            })
            .then(deleted => {
                res
                    .json({
                        msg: `Todo has been removed`
                    })
            })
            .catch(err => {
                console.log(err)
                res
                    .status(500)
                    .json({
                        msg: `Internal Server Error`,
                        err: err
                    })       
            })
    }

    static userRejectingInvitation(req, res) {
        Project
            .findOneAndUpdate({
                _id: req.params.id
            }, {
                $pull: {
                    invitedUsers: req.decoded.id
                }
            }, { new: true })
            .then(done => {
                res
                    .status(200)
                    .json(done)
            })
            .catch(err => {
                console.log(err)
                res
                    .status(500)
                    .json({
                        msg: `Internal server error`,
                        err
                    })
            })        
    }

    static removeMember(req, res) {
        Project
            .findOneAndUpdate({
                _id: req.params.projectId
            }, {
                $pull: {
                    users: req.params.memberId
                }
            })
            .then(success => {
                res
                    .status(200)
                    .json({
                        msg: `Member has been successfully removed`
                    })
            })
            .catch(err => {
                console.log(err)
                res
                    .status(500)
                    .json({
                        msg: `Internal server error`,
                        err
                    })
            })
    }

    static editTodo(req, res) {
        let edit = {
            name: req.body.name,
            status: req.body.status,
            description: req.body.description,
            due_date: req.body.due_date,
            urgency: req.body.urgency
        }
        
        Todo
            .updateOne({
                _id: req.params.todoId
            }, edit)
            .then(updated => {
                res
                    .status(200)
                    .json({
                        msg: `Todo has been successfully updated`
                    })
            })
            .catch(err => {
                console.log(err)
                res
                    .status(500)
                    .json({
                        msg: `Internal server error`,
                        err
                    })
            })
    }
}

module.exports = Controller