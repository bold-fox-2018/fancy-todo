const { Todo } = require('../models');
const mongoose = require('mongoose');

class TodoController {
  static findAll(req, res, next) {
    Todo
      .find()
      .then(function(todos) {
        res.status(200).json(todos)
      })
      .catch(next)
  }

  static findOne({ params }, res, next) {
    Todo
      .findById(params.id)
      .then(function(todo) {
        if(todo) {
          res.status(200).json(todo)
        } else {
          res.status(404).json({
            warning: 'No data is found by given ID.'
          })
        }
      })
      .catch(next)
  }
  

  static findOneByUser({ query, userId }, res, next) {
    let filter = { userId }
    if(query && query.status) {
      filter.status = query.status === 'true' ? true : false
    }
    
    Todo
      .find(filter)
      .then(function(todos) {
        res.status(200).json(todos)
      })
      .catch(next)
  }

  static create({ body, userId }, res, next) {
    body.userId = userId
    Todo
      .create({...body})
      .then(function(todo) {
        res.status(201).json(todo)
      })
      .catch(next)
  }

  static update({ params, body }, res, next) {
    var opts = { 
      new: true,
      runValidators: true, 
      context: 'query' 
    };
    Todo
      .findOneAndUpdate({_id: params.id}, {...body}, opts)
      .then(function(todo) {
        if(todo) {
          console.log(todo)
          res.status(200).json(todo)
        } else {
          res.status(404).json({
            warning: 'No data is found by given ID thus no data is updated.'
          })
        }
      })
      .catch(next)
  }

  static delete({ params }, res, next) {
    Todo
      .findOneAndDelete({_id: params.id})
      .then(function(todo) {
        if(todo) {
          res.status(200).json(todo)
        } else {
          res.status(404).json({
            warning: 'No data is found by given ID thus no data is deleted.'
          })
        }
      })
      .catch(next)
  }
}

module.exports = TodoController;