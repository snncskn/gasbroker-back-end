const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");

module.exports = function (app) {

  app.get("/api/test/all", controller.allAccess);

  app.get(
    "/api/test/user",
    [authJwt.verifyToken],
    controller.userBoard
  );

  app.get(
    "/api/test/mod",
    [authJwt.verifyToken, authJwt.isModerator],
    controller.moderatorBoard
  );

  app.get(
    "/api/test/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );


app.put("/delete/:user_id", controller.delete);
app.get("/:user_id", controller.getById);
app.put("/:user_id", controller.update);
app.get("/", controller.getAll);
app.post("/", controller.create);

};
  