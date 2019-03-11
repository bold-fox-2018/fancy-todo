const mongoose = require('mongoose')

const ENV = require('dotenv')
ENV.config()

const dbName = process.env.DATABASE_NAME
mongoose.connect(`mongodb://localhost/${dbName}`, { useNewUrlParser: true })

mongoose.set('useCreateIndex', true)
mongoose.set('useFindAndModify', false)

const schema = mongoose.Schema

let TaskSchema = new schema({
    taskName: {
        type: String,
        required: true
    },
    priority: {
        type: String,
        required: true
    },
    status: String,
    startDate: {
        type: Date,
        required: true
    },
    dueDate: {
        type: Date,
        required: true
    },
    UserId: {
        type: schema.Types.ObjectId,
        ref: 'Users',
        require: true
    }
})

const Tasks = mongoose.model('Tasks', TaskSchema)

module.exports = Tasks