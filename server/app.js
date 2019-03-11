require('dotenv').config()
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const logger = require('morgan')

const userRouter = require('./routes/userRouter')
const todoRouter = require('./routes/todoRouter')

const app = express()

app.use(cors())

mongoose.connect('mongodb://localhost:27017/fancy-todo', { useNewUrlParser: true })

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/users', userRouter)
app.use('/todos', todoRouter)


app.listen(3000, function () {
    console.log('Listen to port 3000')
})

module.exports = app