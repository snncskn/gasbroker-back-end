const { verifySignUp } = require("../middleware");
const controller = require("../controllers/auth.controller");
const { check, oneOf, validationResult } = require('express-validator');

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


  app.post('/api/auth/recover', oneOf([
    check('email').isEmail().withMessage('Enter a valid email address'),
  ]), (req, res, next) => {
    try {
      validationResult(req).throw();
      // yay! we're good to start selling our skilled services :)))
      res.status(200).json({ statusCode: 200 });
    } catch (err) {
      // Oh noes. This user doesn't have enough skills for this...
      res.status(400).json({ error: err });
    }
  }, controller.recover);

  app.post('/api/auth/change-password/:token', oneOf([
    check('password').not().isEmpty().isLength({ min: 6 }).withMessage('Must be at least 6 chars long'),
    check('confirmPassword', 'Passwords do not match').custom((value, { req }) => (value === req.body.password)),
  ]), (req, res, next) => {
    try {
      validationResult(req).throw();
      // yay! we're good to start selling our skilled services :)))
      res.status(200).json({ statusCode: 200 });
    } catch (err) {
      // Oh noes. This user doesn't have enough skills for this...
      res.status(400).json({ error: err });
    }
  },
    controller.reset);

};




