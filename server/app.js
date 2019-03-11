// express
const express = require('express')
const app = express()
const cors = require('cors')

// router
const user = require('./routers/userRouter')
const task = require('./routers/taskRouter')

// dotenv
const ENV = require('dotenv')
ENV.config()

// port
const port = Number(process.env.PORT)

// bodyparser
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// mongoDB - Mongoose
const mongoose = require('mongoose')
const dbName = process.env.DATABASE_NAME
mongoose.connect(`mongodb://localhost/${dbName}`, { useNewUrlParser: true })

// home
app.get('/', (req, res) => {

})

// express set router
app.use('/user', user)
app.use('/task', task)

// no page found
app.get('*', (req, res) => {
    res.status(404).json({
        message: 'ERROR 404 - PAGE NOT FOUND'
    })
})

app.listen(port, () => {
    console.log('SERVER IS ON AND LISTEN TO', port)
})