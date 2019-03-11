require('dotenv').config()
const express = require('express')
const cors = require('cors')
const mongoose = require ('mongoose')

const indexRouter = require('./routes/index')
const usersRouter = require('./routes/users')
const todosRouter = require('./routes/todo')
const port = 4000

const app = express()
app.use(cors())
mongoose.connect('mongodb://localhost:27017/fancy-todo', {useNewUrlParser: true})

// app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());

app.use('/', indexRouter)
app.use('/users', usersRouter)
app.use('/todos', todosRouter)

app.listen(port, () => {
    console.log(`listening on port ${port}`)
})
module.exports = app