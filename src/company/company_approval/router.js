const express = require("express");
const router = express.Router();
const controller = require("./controller");

router.get("/approvals/:company_id", controller.getApprovalsByCompanyId);
router.post("/", controller.create);

module.exports = router;
