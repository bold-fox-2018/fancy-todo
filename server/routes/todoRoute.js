const Route = require('route-label')(require('express')()),
    auth = require('../middlewares/auth'),
    todoController = require('../controllers/todoController');


Route.use('', '', auth);
Route.post('Create_Todo', '/', todoController.craete);
Route.get('Detail_Todo', '/:id', todoController.listOne);
Route.get('List_All_Todo', '/', todoController.list);
Route.put('List_One_Todo', '/:id', todoController.update);
Route.delete('Delete_One_Todo', '/:id', todoController.delete);

module.exports = Route;