const express = require("express");
const router = express.Router();
const controller = require("./controller");
const offerController = require("./offer/controller");


//proposal offers routes
router.post("/offer", offerController.create);
router.put("/offer/:offer_id", offerController.update);
router.put("/offer/delete/:offer_id", offerController.delete);
router.get("/offer/:offer_id", offerController.getById);
router.get("/offer/", offerController.getAll);
router.get("/offer/:offer_id", offerController.getOffersByProposalId);

//proposal routes
router.put("/delete/:proposal_id", controller.delete);
router.get("/:proposal_id", controller.getById);
router.put("/:proposal_id", controller.update);
router.get("/", controller.getAll);
router.post("/", controller.create);

module.exports = router;