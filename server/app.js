if(process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const mongoose = require('mongoose');
const routes = require('./routes')

mongoose.connect('mongodb://localhost/fancy_todo', { 
  useNewUrlParser: true,
  useCreateIndex: true 
});

app
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .use(require('cors')())

app
  .use('/todoapi/', routes)
  .use(function(err, req, res, next) {
    if(err && err instanceof String) {
      err = new Error(err);
    }
    
    console.log('===>',err)
    res
      .status(res.statusCode === 200 ? 500 : res.statusCode)
      .json(err.errors);
  })

app.listen(port, function() {
  console.log(`app runs on port ${port}`);
});
  