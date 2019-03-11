require('dotenv').config()
const express = require('express'),
    app = express(),
    port = 3000,
    mongoose = require('mongoose'),
    todoRoute = require('./routes/todoRoute'),
    userRoute = require('./routes/userRoute'),
    cors = require('cors'),
    authenticated = require('./middlewares/authenticated')

app.use(express.urlencoded({ extended: false }))
mongoose.connect('mongodb://localhost/fancyTodo')
app.use(cors())

// R O U T E S
app.use('/users', userRoute)
app.use(authenticated)
app.use('/todos', todoRoute)

app.listen(port, () => console.log(`listening on port ${port}`))