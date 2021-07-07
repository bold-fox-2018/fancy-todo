const Project = require('../models/project')

module.exports = {
    addMember: (req,res) => {
        Project
            .updateOne({
                _id: req.params.id
            },{
                $push: {
                    users: [req.body.userId]
                }
            })
            .then(project => {
                res.status(200).json(project)
            })
            .catch(err => {
                res.status(500).json({ message: `internal server error`, err })
            })
    },
    create: (req, res) => {
        Project
            .create({
                name: req.body.name,
                description: req.body.description,
                due_date: req.body.due_date,
                users: req.user.id
            })
            .then(project => {
                res.status(201).json(project)
            })
            .catch(err => {
                res.status(500).json({ message: `internal server error`, err })
            })
    },
    findAll: (req, res) => {
        var query = { users: req.user.id }

        if (req.query.name) {
            query = {
                $and: [{ users: req.user.id }, {
                    name: {
                        $regex: '.*' + req.query.name + '.*',
                        $options: "i"
                    }
                }]
            }
        }

        Project
            .find(query).populate('users').populate('todos')
            .then(projects => {
                if (!projects) res.status(404).json({ message: 'project not found' })
                else {
                    res.status(200).json(projects)
                }
            })
            .catch(err => {
                res.status(500).json({ message: `internal server error`, err })
            })
    },
    findOne: (req, res) => {
        Project
            .findById(req.params.id)
            .then(project => {
                if (!project) res.status(404).json({ message: `project not found` })
                else res.status(200).json(project)
            })
            .catch(err => {
                res.status(500).json({ message: `internal server error`, err })
            })
    },
    update: (req, res) => {
        Project
            .findOneAndUpdate({ _id: req.params.id }, { $set: req.body }, { new: true })
            .then(project => {
                if(!project) res.status(404).json({message : `project not found`})
                else res.status(200).json(project)
            })
            .catch(err => {
                res.status(500).json({ message: `internal server error`, err })
            })
    },
    delete: (req,res) => {
        Project
            .findOneAndDelete({_id: req.params.id})
            .then(project => {
                if(!project) res.status(404).json({message : `project not found`})
                else res.status(200).json(project)
            })
            .catch(err => {
                res.status(500).json({ message: `internal server error`, err })
            })
    }
}