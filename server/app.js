const ENV = require('dotenv')
ENV.config()
const express = require('express')
const app = express()
const port = 3000
const { OAuth2Client } = require('google-auth-library')
const client = new OAuth2Client(process.env.CLIENT_ID)
const jwt = require('jsonwebtoken')
const cors = require('cors')
const Sign = require('./routes/sign')
const User = require('./routes/user')
const Todo = require('./routes/todo')
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())

app.use('/fancyTodo', Sign)
app.use('/fancyTodo/user', User)
app.use('/fancyTodo/todo', Todo)

// app.post('/tokensignin', function(req, res) {
//     client.verifyIdToken({
//             idToken: req.body.idToken,
//             audience: process.env.CLIENT_ID
//         })
//         .then(function(ticket) {
//             const { email, name, picture } = ticket.getPayload()
//             const accessToken = jwt.sign({ email }, )
//         })
// })

app.listen(port, function() {
    console.log('Listening on port', port)
})