const express = require('express')
const router = express.Router();
const controller = require('./controller')

router.put('/delete/:id', controller.delete)
router.get('/:id', controller.getById)
router.put('/:id', controller.update)


router.get('/', controller.getAll)
router.post('/', controller.create)

module.exports = router
