const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');
const isLogin = require('../middlewares/isLogin.js')
/* GET users listing. */

router.get('/', UserController.findAll)
router.post('/register', UserController.register);
router.post('/login', UserController.login);

router.use(isLogin)
router.get('/userdata', UserController.getUserDetail)

module.exports = router;