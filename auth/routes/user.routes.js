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

app.get("/api/user", controller.getAll);
app.put("/api/user/delete/:user_id", controller.delete);
app.get("/api/user/:user_id", controller.getById);
app.put("/api/user/:user_id", controller.update);
app.post("/api/user/", controller.create);

};
  