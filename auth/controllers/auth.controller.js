const db  = require("../../models");
const User = db.user;
const userRoles = db.user_roles;
const role = db.role;
const { emailService } = require("../../email/dependency");
const crypto = require('crypto');
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");


module.exports = {
  signup: (req, res, next) => {


    // Save User to Database
    User.create({
      username: req.body.username,
      email: req.body.email,
      name: req.body.name,
      phonenumber: req.body.mobilePhone,
      settings: '{"layout":"enterprise","scheme":"light","theme":"default"}',
      password: bcrypt.hashSync(req.body.pass, 8),
      permissions: req.body.permissions,
    })
      .then((user) => {
        res.send({ message: "User registered successfully!" });
      })
      .catch((err) => {
        next(err);
      });
  },

  me: (req, res, next) => {

    User.findOne({ where: { user_id: req.headers["user_id"] } })
      .then((user) => {
        if (!user) {
          return res.status(404).send({ error: "invalid User" });
        }
        res.send({
          statusCode: 200,
          email: user.email,
          name: user.name,
          userName: user.username,
          full_name: req.body.name,
          birthday: "01.06.2021",
          gender: "E",
          id: user.id,
          address: "test",
          mobilePhone: user.phonenumber,
          avatar: "assets/images/avatars/male-02.jpg",
          photoURL: "assets/images/avatars/male-02.jpg",
        });
      })
      .catch((err) => {
        next(err);
      });

  },

  signin: (req, res, next) => {
    const params = {};
    const { username, email } = req.body;

    if (username) Object.assign(params, { username });
    if (email) Object.assign(params, { email });

    User.findOne({
      where: { ...params },
      include: [userRoles],
    })
      .then((user) => {
        if (!user) {
          return res.status(404).send({ error: "User Not found." });
        }

        var passwordIsValid = bcrypt.compareSync(
          req.body.password,
          user.password
        );

        if (!passwordIsValid) {
          return res.status(401).send({
            accessToken: null,
            error: "Invalid Password!",
          });
        }

        var token = jwt.sign({ id: user.id }, process.env.TOKEN_SECRET, {
          expiresIn: 3600, // 1 hours
        });

        // var authorities = [];
        // user.getRoles().then(roles => {
        //   for (let i = 0; i < roles.length; i++) {
        //     authorities.push("ROLE_" + roles[i].name.toUpperCase());
        //   }

        var session = req.session;
        session.user_id = 'user.user_id';
      
        let uRole = null;

        if (user.user_roles[0]) {
          role.findOne({ where: { id: user.user_roles[0].roleId } }).then((role) => {
            uRole = role.name;
          });
        }

        res.send({
          statusCode: 200,
          error: null,
          access_token: token,
          user: {
            id: user.id,
            uuid: user.user_id,
            role: uRole,
            data: {
              username: user.username,
              displayName: user.username,
              company_id: user.company_id,
              default_url: '/apps/company/form/' + user.company_id,
              user_id: user.user_id,
              photoURL: "assets/images/avatars/Abbott.jpg",
              email: user.email,
              settings: user.settings,
              permissions: user.permissions,
            },
            // roles: authorities,
          },
        });
        // });
      })

      .catch((err) => {
        next(err);
      });
  },
  accesstoken: (req, res, next) => {
    const access_token = req.headers["x-access-token"];

    let token = access_token;

    if (!token) {
      return res.status(403).send({
        message: "No token provided!",
      });
    }

    jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).send({
          message: "Unauthorized!",
        });
      }

      User.findOne({
        where: { id: decoded.id },
      })
        .then((user) => {
          if (!user) {
            return res.status(404).send({ error: "invalid token" });
          }

          var newtoken = jwt.sign({ id: user.id }, process.env.TOKEN_SECRET, {
            expiresIn: 86400, // 24 hours
          });

          // var authorities = [];
          // user.getRoles().then(roles => {
          //   for (let i = 0; i < roles.length; i++) {
          //     authorities.push("ROLE_" + roles[i].name.toUpperCase());
          //   }
          res.send({
            error: null,
            statusCode: 200,
            access_token: newtoken,
            user: {
              id: user.id,
              uuid: user.user_id,
              role: "admin",
              data: {
                username: user.username,
                email: user.email,
                settings: user.settings,
                displayName: user.username,
                photoURL: "assets/images/avatars/Abbott.jpg",
              },
              // roles: authorities,
            },
          });

          // });
        })
        .catch((err) => {
          res.status(500).send({ error: err.message });
        });
    });
  },

  userupdate: (req, res, next) => {
    let token = req.headers["x-access-token"];
    const { displayName, photoURL, email, settings } = req.body.user.data;

    if (!token) {
      return res.status(403).send({
        message: "No token provided!",
      });
    }

    jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).send({
          message: "Unauthorized!",
        });
      }

      User.findOne({ where: { id: decoded.id } })
        .then((myuser) => {
          if (email) myuser.email = email;
          if (settings) myuser.settings = settings;

          myuser.save();

          res.send({
            error: null,
            statusCode: 200,
            access_token: token,
            user: {
              id: myuser.id,
              uuid: myuser.user_id,
              role: "admin",
              data: {
                username: myuser.username,
                displayName: myuser.username,
                photoURL: "assets/images/avatars/Abbott.jpg",
                email: myuser.email,
                settings: myuser.settings,
              },
              // roles: authorities,
            },
          });
        })
        .catch((err) => {
         next(err);
        });
    });
  },


  recover: (req, res, next) => {

    User.findOne({ where: { email: req.query.email } }).then(user => {

      if (!user) {
        return res.status(401).json({ message: 'The email address ' + req.body.email + ' is not associated with any account. Double-check your email address and try again.' });
      }

      user.passwordResetToken = crypto.randomBytes(20).toString("hex");
      user.passwordResetExpires = Date.now() + 3600000

      user.save();

      const link = "http://" + req.headers.host + "/api/auth/reset/" + user.passwordResetToken;

      const mailOptions = {
        recipient: "snncskn@msn.com",
        from: process.env.EMAIL_DOMAIN || 'gasbroker.navi@gmail.com',
        subject: 'Reset your password on Gas Broker',
        text: "<br>You are receiving this email because you (or someone else) have requested the reset of the password for your account." +
          "<br>Please click on the following link, or paste this into your browser to complete the process : " +
          "<br><br><b>  <a href=" + link + ">" + link + "</a>   </a></b>" +
          "<br><br>If you did not request this, please ignore this email and your password will remain unchanged."
      };

      try {
        emailService.send(mailOptions);
        res.send({ message: "Reset password link sent successfully!" });
      } catch (err) {
        res.status(500).send({ message: err.message });
      }

    })
      .catch(err => res.status(500).json({ message: err.message }));
  },


  reset: (req, res, next) => {

    User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } })
      .then((user) => {

        if (!user) { return res.status(401).json({ message: 'Password reset token is invalid or has expired.' }); }

        user.password = bcrypt.hashSync(req.body.password, 8);
        user.save();

        res.status(200).json({ message: 'Your password has been updated.' });
      })
      .catch(err => res.status(500).json({ message: err.message }));
  },



};
