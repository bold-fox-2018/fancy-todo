if (process.env.NODE_ENV !== 'production') {
    require('dotenv')
      .config()
  }
  
  const express = require('express')
  const path = require('path')
  const cookieParser = require('cookie-parser')
  const logger = require('morgan')
  const cors = require('cors')
  const mongoose = require('mongoose')
  mongoose.connect('mongodb://localhost/todo', { useNewUrlParser: true })
  mongoose.set('useCreateIndex', true);

  const app = express()
  const indexRouter = require('./routes/index')
  
  app.use(cors())
  
  app.use(logger('dev'))
  app.use(express.json())
  app.use(express.urlencoded({ extended: false }))
  app.use(cookieParser())
  app.use(express.static(path.join(__dirname, 'public')))
  
  app.use('/', indexRouter)
  
  module.exports = app