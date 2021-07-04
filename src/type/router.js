const express = require('express')
const router = express.Router();
const controller = require('./controller')

router.put('/delete/:type_id', controller.delete) 
router.get('/:type_id', controller.getByID)
router.put('/:type_id', controller.update)
router.get('/', controller.getAll)
router.post('/', controller.create)

module.exports = router
