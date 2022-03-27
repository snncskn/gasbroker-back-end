const express = require('express')
const router = express.Router();
const controller = require('./controller')

router.get('/companyProcess', controller.getAllCompanyProcess);
router.get("/offers", controller.getOffers);

module.exports = router;
