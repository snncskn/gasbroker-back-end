const express = require("express");
const router = express.Router();
const controller = require("./controller");

router.put("/delete/:message_id", controller.delete);
router.get("/:message_id", controller.getById);
router.put("/:message_id", controller.update);
router.get("/", controller.getAll);
router.post("/", controller.create);

module.exports = router;
