const express = require("express");
const router = express.Router();
const controller = require("./controller");
const { authJwt } = require("../../auth/middleware");

router.put("/delete/:company_id", controller.delete);
router.put("/changeactive/:company_id", controller.changeActiveStatus);
router.get("/:company_id", controller.getByID);
router.put("/:company_id", controller.update);
router.get("/", controller.getAll);
router.post("/", controller.create);


module.exports = router;
