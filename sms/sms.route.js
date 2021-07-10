const express = require("express");
const router = express.Router();
const SmsController = require("./sms.controller");
const { smsService } = require("./dependency");

const smsController = new SmsController(smsService);

router.get("/check", (req, res) => smsController.heartbeat(req, res));
router.post("/send", (req, res) => smsController.send(req, res));
router.post("/send_batch", (req, res) => smsController.sendBatch(req, res));

module.exports = router;
