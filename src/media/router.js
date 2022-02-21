const express = require("express");
const router = express.Router();
const controller = require("./controller");
const { authJwt } = require("../../auth/middleware");

router.get("/s3/generateGetUrl", controller.getFileUrl);
router.get("/s3/generatePutUrl", controller.getPutUrl);
router.put("/delete/:media_id", controller.delete);
router.get("/:media_id", controller.getById);
router.put("/:media_id", controller.update);
router.get("/", [authJwt.verifyToken, authJwt.isAdmin], controller.getAll);
router.post("/", controller.create); 

router.get("/medias/:company_id", controller.getMediasByCompanyId);
router.get("/medias/:vehicle_id", controller.getMediasByVehicleId);
router.get("/medias/:product_id", controller.getMediasByProductId);
router.get("/medias/:message_id", controller.getMediasByMessageId);

module.exports = router;
