const express = require('express')
const router = express.Router();
const controller = require('./controller')
const { authJwt } = require("../../auth/middleware");


router.get('/companyProcess', controller.getAllCompanyProcess)

module.exports = router
