
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const port = 3000

app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())

const userRoutes = require('./routes/user')
const todoRoutes = require('./routes/todo')

//for user
app.use("/users", userRoutes)
app.use("/todos", todoRoutes)



app.listen(port, () => console.log("listening on port" + port))  