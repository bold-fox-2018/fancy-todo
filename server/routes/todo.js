const express = require('express');
const router = express();
const TodoController = require('../controllers/todoController');
const isLogin = require('../middlewares/isLogin.js')
/* GET users listing. */

// router.post('/register', TodoController.create);

router.use(isLogin)
router.post('/register', TodoController.create);
router.get('/mytodo', TodoController.displayListTodoByUserid)
router.get('/mytodo/:id', TodoController.displayIndividualTodo)

router.put('/edit/:id', TodoController.editIndividualTodo)
router.delete('/delete/:id', TodoController.deleteIndividualTodo)


module.exports = router;