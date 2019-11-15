const Model = require('../models/todo')
const jwt = require('../helper/jwt')
const verify = require('../middlewares/verify')
const User = require('../models/user')
class Controller {

    static one(req, res) {
        var tokenJadi = jwt.verify(req.headers.token)
        // console.log('=====a');

        console.log(tokenJadi);
        User.findOne({
                email: tokenJadi.email
            })
            .populate('todo')
            .then(function (data) {

                res.send(data)


            })
            .catch(function (err) {
                res.status(500).json({
                    messege: 'not fond'
                })
            })

    }

    static list(req, res) {

        Model.find({}, function (err, data) {
            if (data) {
                res.send(data)
            } else {
                res.send('not')
            }
        })

    }

    static create(req, res) {
        // console.log('==========okok');
        Model.create(req.body, function (err, data) {
            if (data) {

                res.send(data)
                // res.send('ok')
            } else {
                res.send('not')
            }
        })
    }

    static updateOne(req, res) {
        var ID = req.headers.id
        // console.log(ID);
        // console.log('okokokokok');
        // res.send('ok')
        Model.findById({
                _id: ID
            })
            .then(function (data) {
                console.log(data);

                res.send(data)
            })
            .catch(function (err) {
                res.send(err)
            })


    }
    static update(req, res) {
        req.body.due_date = Date(req.body.due_date)

        // console.log('=================');
        // console.log(req.body);
        var obj = {
            name: req.body.name,
            description: req.body.description,
            due_date: Date(req.body.due_date),
            status: req.body.status
        }
        console.log(obj);

        Model.findByIdAndUpdate(req.params.id, req.body, function (err, data) {
            if (data) {
                res.status(200).json(data)
            } else {
                res.status(500).json({
                    messege: 'not fond'
                })
            }

        })
    }

    static remove(req, res) {
        Model.findByIdAndDelete(req.params.id, function (err, data) {
            if (data) {
                res.status(200).json(data)
            } else {
                res.status(500).json({
                    messege: 'not fond'
                })
            }
        })
    }

}

module.exports = Controller