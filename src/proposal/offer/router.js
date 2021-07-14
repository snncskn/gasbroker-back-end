const express = require("express");
const router = express.Router();
const controller = require("./controller");

//proposal offers routes
router.post("/", controller.create);
router.put("/:offer_id", controller.update);
router.put("/delete/:offer_id", controller.delete);
router.get("/:offer_id", controller.getById);
router.get("/", controller.getAll);
router.get("/proposal/:proposal_id", controller.getOffersByProposalId);

module.exports = router;