var dotenv = require("dotenv");
const db = require("../../models");
const { emailService } = require("../../email/dependency");

const User = db.user;
const Role = db.role;

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const crypto = require('crypto');
const randomBytesAsync = promisify(crypto.randomBytes);


dotenv.config();

module.exports = {
  signup: (req, res) => {
    // Save User to Database
    User.create({
      username: req.body.username,
      email: req.body.email,
      name: req.body.name,
      phonenumber: req.body.mobilePhone,
      settings: req.body.settings,
      password: bcrypt.hashSync(req.body.pass, 8),
    })
      .then((user) => {
        if (req.body.roles) {
          Role.findAll({
            where: {
              name: {
                [Op.or]: req.body.roles,
              },
            },
          }).then((roles) => {
            user.setRoles(roles).then(() => {
              res.send({ message: "User registered successfully!" });
            });
          });
        } else {
          // user role = 1
          user.setRoles([1]).then(() => {
            res.send({ message: "User registered successfully!" });
          });
        }
        res.send({ message: "User registered successfully!" });
      })
      .catch((err) => {
        res.status(500).send({ message: err.message });
      });
  },

  me: (req, res) => {
    /*      
    User.findOne({  where: { email: req.body.email } }).then(user => {
      if (!user) {
        return res.status(404).send({ error: "invalid User" });
      }
      res.send({
      statusCode: 200,
      body:user
      });

    }).catch(err => {
      res.status(500).send({ error: err.message });
    });
   

  
  username: req.body.username,
    email: req.body.email,
    name: req.body.name,
    phonenumber: req.body.mobilePhone,
    settings: req.body.settings,
  */
    res.status(200).send({
      error: null,
      access_token: "asdasdasd",
      email: "power@navigroup.com",
      name: "Sinan COŞKUN",
      userName: "sinan.coskun",
      full_name: "sinan coskun",
      birthday: "01.01.2020",
      gender: "E",
      id: 99,
      address: "test",
      mobilePhone: "05074606083",
      avatar: "assets/images/avatars/male-02.jpg",
      photoURL: "assets/images/avatars/male-02.jpg",
    });
  },

  reset: (req, res) => {
    try {
      User.findOne({ where: { email: req.body.email } })
        .then((user) => {
          if (!user) {
            return res.status(404).send({ error: "invalid User" });
          }

          user.password = bcrypt.hashSync(123456, 8);
          user.save();

          res.status(200).send({
            error: null,
            newPassword: 123456,
            message: "new password will send mail",
          });
        })
        .catch((err) => {
          res.status(500).send({ error: err.message });
        });
    } catch (error) {
      res.status(500).send({ message: error });
    }
  },

  signin: (req, res) => {
    const params = {};
    const { username, email } = req.body;

    if (username) Object.assign(params, { username });
    if (email) Object.assign(params, { email });

    User.findOne({
      where: { ...params },
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
          expiresIn: 86400, // 24 hours
        });

        // var authorities = [];
        // user.getRoles().then(roles => {
        //   for (let i = 0; i < roles.length; i++) {
        //     authorities.push("ROLE_" + roles[i].name.toUpperCase());
        //   }
        res.send({
          statusCode: 200,
          error: null,
          access_token: token,
          user: {
            id: user.id,
            uuid: user.user_id,
            role: "admin",
            data: {
              username: user.username,
              displayName: "cihan kaya",
              company_id: user.company_id,
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
        res.status(500).send({ error: err.message });
      });
  },
  accesstoken: (req, res) => {
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
          res.status(200).send({
            error: null,
            access_token: newtoken,
            user: {
              id: user.id,
              uuid: user.user_id,
              role: "admin",
              data: {
                username: user.username,
                email: user.email,
                settings: user.settings,
                displayName: "cihan kaya",
                photoURL: "assets/images/avatars/Abbott.jpg",
                email: "cihan@kaya.com",
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

  userupdate: (req, res) => {
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
          console.log(settings);

          myuser.save();
          res.status(200).send({
            error: null,
            access_token: token,
            user: {
              id: myuser.id,
              uuid: myuser.user_id,
              role: "admin",
              data: {
                username: myuser.username,
                displayName: "cihan kaya",
                photoURL: "assets/images/avatars/Abbott.jpg",
                email: myuser.email,
                settings: myuser.settings,
              },
              // roles: authorities,
            },
          });
        })
        .catch((err) => {
          res.status(500).send({ error: err.message });
        });
    });
  },

  postForgot: (req, res, next) => {
    const createRandomToken = randomBytesAsync(16)
      .then(buf => buf.toString('hex'));

    const setRandomToken = token =>
      User
        .findOne({
          where: {
            email: req.body.email
          }
        })
        .then(user => {
          if (!user) {
            return res.status(400).send({ error: 'Account with that email address does not exist.' })
          }


          user.passwordResetToken = token
          user.passwordResetExpires = Date.now() + 3600000
          return user.save()
        })

    const sendForgotPasswordEmail = (user) => {
      if (!user) return
      const token = user.passwordResetToken;

      const mailOptions = {
        recipient: user.email,
        from: process.env.EMAIL_DOMAIN || 'gasbroker.navi@gmail.com',
        subject: 'Reset your password on Gas Broker',
        text: `You are receiving this email because you (or someone else) have requested the reset of the password for your account.\n\n
        Please click on the following link, or paste this into your browser to complete the process:\n\n
        http://${req.headers.host}/reset/${token}\n\n
        If you did not request this, please ignore this email and your password will remain unchanged.\n`
      };
      try {
        let info = await emailService.send(mailOptions);
        res.send({ message: "Reset password link sent successfully!" });
      } catch (err) {
        res.status(500).send({ message: err.message });
      }
    };

    createRandomToken
      .then(setRandomToken)
      .then(sendForgotPasswordEmail)
  }

};
