const controller = require('../controllers/userController')
const router = require('express').Router()

router.get('/', controller.allUsers) //untuk search username ketika create project
router.get('/:id', controller.getUser)

//get projects sama get todos ada langsung akses dari routing masing-masing model karena di user ga ada field projects dan todos

module.exports = router