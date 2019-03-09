require('dotenv').config();
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');

const indexRouter = require('./routes/index');
const tasksRouter = require('./routes/tasks');
const projectsRouter = require('./routes/project');

// mongoose setup
let db_connection = 'mongodb://localhost/MakeItFancy';
mongoose.connect(db_connection, { useNewUrlParser: true });
mongoose.connection.on('open', () => console.log('DB Connected')).once('error', (error) => console.log('connection error:', error));

var app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/tasks', tasksRouter);
app.use('/projects', projectsRouter);

module.exports = app;
