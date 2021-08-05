const express = require("express");
const router = express.Router();
const controller = require("./controller");

router.put("/delete/:process_id", controller.delete);
router.get("/:process_id", controller.getById);
router.put("/:process_id", controller.update);
router.get("/", controller.getAll);
router.post("/", controller.create);
router.get("/processes/:proposal_id", controller.getProcessesByProposalId);

module.exports = router;
