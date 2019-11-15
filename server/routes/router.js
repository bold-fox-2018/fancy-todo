const router = require('express').Router(),
    userController = require('../controller/userController'),
    todoContoller = require('../controller/todoController'),
    axios = require('axios')
const midlewere = require('../middlewares/verify')


//======instant method axios


// router.get()

router.get('/todo/all', todoContoller.list)
router.get('/todo/update/', todoContoller.updateOne)
router.post('/todo/create', todoContoller.create)
router.put('/todo/:id', todoContoller.update)
router.delete('/todo/:id', todoContoller.remove)
router.get('/todo/one/', midlewere, todoContoller.one)


// =============================================================================
// =============================================================================
// =============================================================================

router.get('/user/all', userController.list)
router.post('/user/create', userController.create)
router.put('/user/:id', userController.update)
router.post('/user/add', midlewere, userController.add);
router.delete('/user/:id', userController.remove)
router.patch('/user/remove/:id', midlewere, userController.removeOne)

// // ==============================================================================
router.post('/user/login', userController.login);
router.post('/user/register', userController.create);





module.exports = router