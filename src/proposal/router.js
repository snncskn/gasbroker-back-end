const express = require("express");
const router = express.Router();
const controller = require("./controller");
const offerController = require("./offer/controller");


//proposal offers routes
router.get("/offer/", offerController.getAll);

router.put("/delete/:proposal_id", controller.delete);
router.get("/:proposal_id", controller.getById);
router.put("/:proposal_id", controller.update);
router.get("/", controller.getAll);
router.post("/", controller.create);

//proposal offers routes
router.get("/offer", offerController.getAll);
router.post("/proposal-offer", offerController.create);
router.put("/proposal-offer/:proposal_id", offerController.update);
router.put("/proposal-offer/delete/:proposal_id", offerController.delete);
router.get("/proposal-offer/:proposal_id", offerController.getOffersByProposalId);
router.get("/proposal-offer/:proposal_offer_id", offerController.getById);

router.get(
    ['/test', '/alternative', '/barcus*', '/farcus/:farcus/', '/hoop(|la|lapoo|lul)/poo'],
    function ( request, response ) {

    }
);

module.exports = router;