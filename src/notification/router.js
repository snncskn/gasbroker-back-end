const express = require('express')
const router = express.Router();
const controller = require('./controller')

router.get('/:notification_id', controller.getById)
router.put('/:notification_id', controller.update)
router.put('/delete/:notification_id', controller.delete)
router.post('/', controller.create)

module.exports = router;
