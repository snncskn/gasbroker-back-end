const express = require('express')
const router = express.Router();
const controller = require('./controller')

router.get('/:agreement_id', controller.getById)
router.put('/:agreement_id', controller.update)
router.get("/proposal/:proposal_id", controller.getByProposalId);
router.put('/delete/:agreement_id', controller.delete)

router.get('/', controller.getAll)
router.post('/', controller.create)

module.exports = router
