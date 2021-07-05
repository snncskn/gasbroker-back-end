const express = require('express')
const router = express.Router();
const controller = require('./controller')

router.put('/delete/:product_id', controller.delete)
router.get('/:product_id', controller.getById)
router.put('/:product_id', controller.update)


router.get('/', controller.getAll)
router.post('/', controller.create)

module.exports = router
