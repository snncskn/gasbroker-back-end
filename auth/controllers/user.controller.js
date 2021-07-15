 
const { user  } = require("../../models");


const bcrypt = require("bcryptjs");

const Data = user;

module.exports = {
  allAccess = (req, res) => {
    res.send("Public Content.");
  },
  userBoard = (req, res) => {
    res.send("User Content.");
  },
  adminBoard = (req, res) => {
    res.send("Admin Content.");
  },
  moderatorBoard = (req, res) => {
    res.send("Moderator Content.");
  },
  getAll: async (req, res) => {
    try {
      const user = await Data.findAll();
      res.json({
        statusCode: 200,
        body: user,
      });
    } catch (err) {
      res.status(500).json({ error: err });
    }
  },
  getById: async (req, res) => {
    const id = req.params.user_id;
    try {
      const user = await Data.findOne({
        where: { id }
      });
      res.json({
        statusCode: 200,
        body: user,
      });
    } catch (err) {
      res.status(500).json({ error: err });
    }
  },
  create: async (req, res) => {
    const {
      name,
      email,
      username,
      password,
      website
    } = req.body;
    
    try {
      const user = await Data.create({
        name,
        email,
        username,
         password: bcrypt.hashSync(password, 8),
        website
      
      });

      res.json({
        statusCode: 200,
        body: user,
      });
    } catch (err) {
      res.status(500).json({ error: err });
    }
  },
  update: async (req, res) => {
    const id = req.params.user_id;
    const {
      name,
      email,
      username,
      password,
      website
    } = req.body;

    password: bcrypt.hashSync(password, 8);

    try {
      const user = await Data.findOne({ where: { id } });

      if (id) user.id = id; 
      if (name) user.name = name; 
      if (email) user.email = email; 
      if (username) user.username = username; 
      if (password) user.password = password; 
      if (id) user.website = website; 
   
      await user.save();

      res.json({
        statusCode: 200,
        body: user,
      });
    } catch (err) {
      res.status(500).json({ error: err });
    }
  },
  delete: async (req, res) => {
    const id = req.params.user_id;

    try {
      await Data.destroy({
        where: {
          id: id,
        },
      });

      res.json({
        statusCode: 200,
        body: Data,
      });
    } catch (err) {
      res.status(500).json({ error: err });
    }
  },
};
