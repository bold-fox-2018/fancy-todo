require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
mongoose.connect(`mongodb://localhost:27017/db_fancy_todo`, { useNewUrlParser: true })

const userRoute = require('./router/user')
const todoRoute = require('./router/todo')
const projectRoute = require('./router/project')

app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
const port = 3000

app.use('/users', userRoute)
app.use('/todos', todoRoute)
app.use('/projects', projectRoute)

app.listen(port, () => {
    console.log(`listening to port ${port}`)
})