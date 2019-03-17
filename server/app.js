require('dotenv').config();
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const { authentication, projectAuthorization } = require('./middlewares/verifyUser.js');

const userRoute = require('./routes/userRoute.js');
const todoRoute = require('./routes/todoRoute.js');
const projectRoute = require('./routes/projectRoute.js');

const app = express();

const databaseName = 'fancy_todo_isro';
const urlDatabase = `mongodb+srv://biaryakin:12345@cluster0-j8ssj.mongodb.net/fancy?retryWrites=true`;

mongoose.connect(urlDatabase, {useNewUrlParser: true});

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/user', userRoute);
app.use(authentication);
app.use('/todo', todoRoute);
app.use('/project', projectRoute);

module.exports = app;
