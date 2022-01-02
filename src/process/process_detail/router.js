const express = require("express");
const router = express.Router();
const controller = require("./controller");

router.put("/delete/:process_detail_id", controller.delete);
router.get("/:process_detail_id", controller.getById);
router.put("/:process_detail_id", controller.update);
router.get("/", controller.getAll);
router.post("/", controller.create);

router.get("/details/:process_id", controller.getItemsByProcessId);

module.exports = router;
