const jwt = require('jsonwebtoken'),
    User = require('../models/user'),
    bcrypt = require('../helpers/bcrypt'),
    { OAuth2Client } = require('google-auth-library'),
    client = new OAuth2Client(process.env.G_CLIENT_ID);


class UserController {
    static formSignIn(req, res) {
        console.log(req.body);
        const { email, password } = req.body;
        User.findOne({ email })
            .then(function (user) {
                if (!user) {
                    return User.create({ email, password, source: "manual" });  // 404
                }
                else if (bcrypt.compare(password, user.password) && user.source === 'manual') {
                    return user;
                }
                else {
                    console.log(user);
                    console.log(bcrypt.compare(password, user.password));
                    console.log("masuk");
                    res.status(401).json({
                        message: `Email / password is invalid`
                    })
                }
            })
            .then(function (user) {
                const { _id } = user._id
                const token = jwt.sign({ _id, email }, process.env.JWT_SECRET);
                res.status(200).json({ token, email })
            })
            .catch(function (err) {
                console.log("bawah");
                res.status(500).json({
                    message: `Internal Server Error`, err
                })
            })
    }

    static googleSignIn(req, res) {
        console.log('masuk');
        try {
            let email = '',
                password = `${process.env.DEFAULT_PSWD}`,
                source = 'google';
            console.log(password);
            client.verifyIdToken({
                idToken: req.body.id_token,
                audience: process.env.G_CLIENT_ID
            })
                .then(function (response) {
                    email = response.payload.email;
                    return User.findOne({ email })
                })
                .then(function (user) {
                    console.log(password);
                    if (user) return user;
                    else {
                        return User.create({ email, password, source })
                    }
                })
                .then(function (user) {
                    const { _id } = user;
                    console.log("jwt");

                    const token = jwt.sign({ _id, email }, process.env.JWT_SECRET);
                    console.log("==============");
                    console.log(token);
                    res.status(200).json({ token, email })
                })
        }
        catch (error) {
            res.status(500).json({ message: `Internal Server Error`, error })
        }


    }

    static login(req, res) {

    }
}
module.exports = UserController;