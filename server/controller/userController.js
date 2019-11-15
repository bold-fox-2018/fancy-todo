const Model = require('../models/user')
const googleSignin = require('../helper/google');
const jwt = require('../helper/jwt')
const bcrypt = require('bcrypt');
const Todo = require('../models/todo')
class Controller {



    static removeOne(req, res) {
        var ID = req.params.id
        console.log(req.headers);
        var tokenJadi = jwt.verify(req.headers.token)

        Model.findOne({
                email: tokenJadi.email
            })
            .then(function (data) {
                var arr = []
                for (var i = 0; i < data.todo.length; i++) {
                    if (data.todo[i] == ID) {
                        // console.log(i, '===========', data.todo[i]);
                    } else {
                        arr.push(data.todo[i])
                    }
                }
                data.todo = arr
                // console.log(data);
                return Model.update({
                    email: tokenJadi.email
                }, data, {
                    new: true
                })
                res.send(data)
            })
            .then(function (data) {
                res.send(data)

            })
            .catch(function (err) {
                res.send(err)
            })

    }







    static add(req, res) {
        var tokenJadi = jwt.verify(req.headers.token)
        Todo.create(req.body)
            .then(function (data) {
                console.log(data);

                return Model.update({
                    email: tokenJadi.email
                }, {
                    $push: {
                        todo: data._id
                    }
                }, {
                    new: true
                })
            })
            .then(function (data) {
                res.send(data)

            })
            .catch(function (err) {
                res.send(err)
            })
    }

    static login(req, res) {

        var emailUser = ''
        if (req.body.loginVia == 'google') {
            googleSignin(req.body.id_token)
                .then(function (user) {
                    emailUser = user.email
                    return Model.findOne({
                        email: user.email
                    })
                })
                .then(function (data) {
                    if (!data) {
                        // console.log('========');

                        return Model.create({
                            email: emailUser,
                            password: '123'
                        })

                    } else {
                        let token = jwt.sign({
                            email: emailUser
                        })
                        res.status(200).json({
                            token: token
                        })
                    }
                })
                .then(function (dataRegister) {

                    let token = jwt.sign({
                        email: dataRegister.email
                    })

                    res.status(201).json({
                        token: token
                    })
                })
                .catch(function (err) {
                    console.log('eror ni');

                    res.send('eror nih')
                })

        } else if (req.body.loginVia == 'website') {
            Model.findOne({
                    email: req.body.email

                })
                .then(function (user) {
                    if (!user) {
                        res.status(400).json({
                            message: 'Email/Password salah'
                        })
                    } else {
                        let validasi = bcrypt.compareSync(req.body.password, user.password);
                        console.log(validasi == true);
                        if (validasi) {
                            let token = jwt.sign({
                                email: user.email
                            })
                            // console.log(token);
                            res.status(200).json({
                                token
                            })
                        } else {
                            res.status(400).json({
                                message: 'Wrong Email/Password'
                            })
                        }
                    }
                })
        }

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
                console.log(data);

                res.send(data)
                // res.send('ok')
            } else {
                res.status(500).json(err.message)
            }
        })
    }
    static update(req, res) {

        Model.findOneAndUpdate(req.params.id, req.body, function (err, data) {
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