const express = require("express");
const router = express.Router();
const controller = require("./controller");

router.put("/delete/:proposal_id", controller.delete);
router.get("/:proposal_id", controller.getById);
router.put("/:proposal_id", controller.update);
router.get("/", controller.getAll);
router.post("/", controller.create);

module.exports = router;