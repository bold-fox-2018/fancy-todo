const router = require('express').Router();
const { authentication } = require('../middlewares/verifyUser');
const userController = require('../controllers/userController')

router.post('/signin', userController.signin);
router.post('/signup', userController.signup);
router.post('/verifyToken', authentication, userController.verify);

module.exports = router;