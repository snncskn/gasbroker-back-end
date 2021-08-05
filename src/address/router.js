const express = require('express')
const router = express.Router();
const controller = require('./controller')
const { authJwt } = require("../../auth/middleware");

router.put('/delete/:address_id', controller.delete)
router.get('/:address_id', controller.getByID)
router.get('/company/:company_id', controller.getByCompanyId)
router.put('/:address_id', controller.update)
router.post('/', controller.create)

module.exports = router
