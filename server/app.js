const express = require('express')
const app = express()
const routeruser = require('./routes/Users')
const routertodo = require('./routes/Todos')
const routergoogle = require('./routes/Google')
const cors = require('cors')
const port = 3000
// require('dotenv').config()

// Setting Cors
app.use(cors())
app.use(express.json())
// Setting Body Parser
app.use(express.urlencoded({extended: false}))

// Setting Route
app.use('/fancy-todo', routergoogle)
app.use('/fancy-todo/user', routeruser )
app.use('/fancy-todo/todo', routertodo )

app.listen(port, ()=> console.log('Run forest run', port))