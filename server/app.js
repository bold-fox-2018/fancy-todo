require('dotenv').config()

const express = require('express'),
      app = express()

const cors = require('cors'),
      jwt = require('jsonwebtoken'),
      mongoose   = require('mongoose')

const indexRouter = require('./routes/index'),
      todosRouter = require('./routes/todos')

const port = process.env.PORT || 3000

mongoose.connect('mongodb://localhost:27017/todo-list',{ useNewUrlParser: true })

app
.use(express.json())
.use(express.urlencoded({ extended: false }))
.use(cors())

app
.use('/api', indexRouter)
.use('/api/todos', todosRouter)

app.listen (port, () => {
  console.log(`Listening on port: ${port}`)
})