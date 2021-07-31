const express = require("express");
const router = express.Router();
const controller = require("./controller");
const { authJwt } = require("../../auth/middleware");

router.get("/s3/generateGetUrl", controller.getFileUrl);
router.get("/s3/generatePutUrl", controller.getPutUrl);
router.put("/delete/:media_id", [authJwt.verifyToken, authJwt.isModeratorOrAdmin], controller.delete);
router.get("/:media_id", controller.getById);
router.put("/:media_id", controller.update);
router.get("/", [authJwt.verifyToken, authJwt.isAdmin], controller.getAll);
router.post("/", controller.create); 

module.exports = router;
