const express = require("express");
const router = express.Router();
const controller = require("./controller");

router.put("/delete/:process_sub_group_id", controller.delete);
router.get("/:process_sub_group_id", controller.getById);
router.put("/:process_sub_group_id", controller.update);
router.get("/", controller.getAll);
router.post("/", controller.create);

module.exports = router;
