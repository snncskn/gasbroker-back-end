const express = require("express");
const router = express.Router();
const controller = require("./controller");

router.get('/', controller.getAll)
router.get('/:payment_id', controller.getById)
router.put('/:payment_id', controller.update)
router.put('/delete/:payment_id', controller.delete)
router.post('/', controller.create)


module.exports = router;
