const { verifySignUp } = require("../middleware");
const controller = require("../controllers/auth.controller");
const { check } = require('express-validator');

module.exports = function (app) {

  app.post(
    "/api/auth/signup",
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted
    ],
    controller.signup
  );

  app.post("/api/auth/signin", controller.signin);
  app.post("/api/auth/me", controller.me);

  app.get("/api/auth/access-token", controller.accesstoken);

  app.post("/api/auth/user/update", controller.userupdate);


  app.post('/api/auth/recover', [
    check('email').isEmail().withMessage('Enter a valid email address'),
  ], controller.recover);

  app.post('/api/auth/reset/:token', [
    check('password').not().isEmpty().isLength({ min: 6 }).withMessage('Must be at least 6 chars long'),
    check('confirmPassword', 'Passwords do not match').custom((value, { req }) => (value === req.body.password)),
  ], controller.reset);

};




