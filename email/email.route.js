const express = require("express");
const router = express.Router();
const EmailController = require("./email.controller");
const { emailService } = require("./dependency");

const emailController = new EmailController(emailService);

router.get("/check", (req, res) => emailController.heartbeat(req, res));
router.post("/send", (req, res) => emailController.send(req, res));
router.post("/send_batch", (req, res) => emailController.sendBatch(req, res));

module.exports = router;
