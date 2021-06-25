var dotenv = require('dotenv');
const db = require("../../models");
const User = db.user;
const Role = db.role;

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

dotenv.config();
exports.signup = (req, res) => {
  // Save User to Database
  User.create({
    username: req.body.username,
    email: req.body.email,
    settings: req.body.settings,
    password: bcrypt.hashSync(req.body.password, 8)
  })
    .then(user => {
      if (req.body.roles) {
        Role.findAll({
          where: {
            name: {
              [Op.or]: req.body.roles
            }
          }
        }).then(roles => {
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
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.signin = (req, res) => {
  const params = {};
  const {
    username,
    email
  } = req.body

  if (username) Object.assign(params, { username });
  if (email) Object.assign(params, { email });

  User.findOne({
    where: { ...params }
  })
    .then(user => {
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
          error: "Invalid Password!"
        });
      }

      var token = jwt.sign({ id: user.id }, process.env.TOKEN_SECRET, {
        expiresIn: 86400 // 24 hours
      });

      // var authorities = [];
      // user.getRoles().then(roles => {
      //   for (let i = 0; i < roles.length; i++) {
      //     authorities.push("ROLE_" + roles[i].name.toUpperCase());
      //   }
        res.status(200).send({
          error: null,
          access_token: token,
          user: {
              id: user.id,
              uuid: user.user_id,
              username: user.username,
              email: user.email,
              settings: user.settings,
            role: 'admin',

            data: {
              displayName: 'Abbott Keitch',
              photoURL: 'assets/images/avatars/Abbott.jpg',
              email: 'admin@fusetheme.com',
            }
              // roles: authorities,

            }
        });
      // });
    })







    .catch(err => {
      res.status(500).send({ error: err.message });
    });
};

exports.accesstoken = (req, res) => {
  console.log(req.body)
  const access_token = req.headers["x-access-token"];

  let token = access_token

  if (!token) {
    return res.status(403).send({
      message: "No token provided!"
    });
  }


  jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!"
      });
    }

    User.findOne({
      where: { id: decoded.id }
    })
      .then(user => {
        if (!user) {
          return res.status(404).send({ error: "invalid token" });
        }


        var newtoken = jwt.sign({ id: user.id }, process.env.TOKEN_SECRET, {
          expiresIn: 86400 // 24 hours
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
            username: user.username,
            email: user.email,
            settings: user.settings,
            role: 'admin',
            data: {
              displayName: 'Abbott Keitch',
              photoURL: 'assets/images/avatars/Abbott.jpg',
              email: 'admin@fusetheme.com',
            }
            // roles: authorities,
          }
        });

        // });
      }).catch(err => {
        res.status(500).send({ error: err.message });
      });


  });


};
