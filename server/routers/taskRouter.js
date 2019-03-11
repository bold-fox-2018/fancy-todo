const router = require('express').Router()
const controller = require('../controllers/taskController')
const authentication = require('../middleware/authentication')

// get all task
router.get('/', authentication, controller.getAll)

// add new task
router.post('/addnew', authentication, controller.addnew)

// update task
router.put('/update', authentication, controller.update)

// delete task
router.delete('/delete/:id', authentication, controller.delete)



module.exports = router