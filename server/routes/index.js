var routes = require('express').Router();
const { register, login, checkUser, findAll } = require('../controllers/user');
const auth = require('../middlewares/authenticate');
/* GET home page. */
routes.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

routes.post('/register', register);
routes.post('/login', login);
routes.get('/auth', auth, checkUser);
routes.get('/users', findAll);

module.exports = routes;
