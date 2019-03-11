const MongoClient = require('mongodb').MongoClient;
// const assert = require('assert');
// Connection URL
const url = 'mongodb://localhost:27017';
// Database Name
const dbName = 'fancyTodo';

// Create a new MongoClient
const client = new MongoClient(url, {
    useNewUrlParser: true
});


const express = require('express'),
    app = express(),
    router = require('./routes/router'),
    port = 3000,
    cors = require('cors')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({
    extends: false
}))

app.use('/api', router)

app.listen(port, function () {
    console.log(`live on port ${port} ######*******`);
})