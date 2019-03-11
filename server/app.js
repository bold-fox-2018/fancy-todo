require('dotenv').config();
const express = require('express'),
    userRoute = require('./routes/userRoute'),
    todoRoute = require('./routes/todoRoute'),
    mongoose = require('mongoose'),
    cors = require('cors'),
    app = express(),
    port = 5000;

mongoose.connect(`mongodb://localhost:27017/${process.env.DB_NAME}`, { useNewUrlParser: true });

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

// R O U T I N G
app.use('/users', userRoute);
app.use('/todos', todoRoute);

app.listen(port, () => console.log(`Listen on port ${port}`))
