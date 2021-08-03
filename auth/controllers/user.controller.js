const { user, company } = require("../../models");

const bcrypt = require("bcryptjs");
const { round } = require("lodash");
const { Op } = require("sequelize");

const Data = user;

module.exports = {
  allAccess: async (req, res) => {
    res.send("Public Content.");
  },
  userBoard: async (req, res) => {
    res.send("User Content.");
  },
  adminBoard: async (req, res) => {
    res.send("Admin Content.");
  },
  moderatorBoard: async (req, res) => {
    res.send("Moderator Content.");
  },
  getAll: async (req, res) => {
    let by = req.query.sortBy == undefined ? "created_at" : req.query.sortBy;
    let type = req.query.sortType == undefined ? "DESC" : req.query.sortType;
    let size = req.query.size == undefined ? 100 : req.query.size;
    let page = req.query.page == undefined ? 0 : req.query.page;

    let filter = req.query.filter;

    let whereStr = {};

    if (filter) {
      whereStr = {
        [Op.or]: [
          { name: { [Op.like]: "%" + filter + "%" } },
          { username: { [Op.like]: "%" + filter + "%" } },
          { email: { [Op.like]: "%" + filter + "%" } },
        ],
      };
    }

    let whereClause = {
      limit: size,
      offset: page,
      order: [[by, type]],
      where: whereStr,
      include: [company],
    };

    try {
      const totalSize = await Data.count();
      const users = await Data.findAll(whereClause);

      res.json({
        statusCode: 200,
        body: users,
        totalSize: totalSize,
        totalPage: round(Number(totalSize) / Number(size)),
      });
    } catch (err) {
      res.status(500).json({ error: err.stack });
    }
  },
  getById: async (req, res) => {
    const id = req.params.user_id;
    try {
      const user = await Data.findOne({
        where: { id },
        include: [company],
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
    const { name, email, username, password, website, company_id } = req.body;

    try {
      const user = await Data.create({
        name,
        email,
        username,
        password: bcrypt.hashSync(password, 8),
        website,
        company_id,
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
    const { name, email, username, website, company_id, permissions } =
      req.body;

    try {
      const user = await Data.findOne({ where: { id } });

      if (id) user.id = id;
      if (name) user.name = name;
      if (email) user.email = email;
      if (username) user.username = username;
      if (id) user.website = website;
      if (company_id) user.company_id = company_id;
      if (permissions) user.permissions = permissions;

      await user.save();

      res.json({
        statusCode: 200,
        body: user,
      });
    } catch (err) {
      res.status(500).json({ error: err });
    }
  },
  updateSettings: async (req, res) => {
    const id = req.params.user_id;
    const { setting } =
      req.body;

    try {
      const user = await Data.findOne({ where: { id } });

      if (id) user.id = id;
      if (setting) user.setting = setting;

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
  changeActive: async (req, res) => {
    const id = req.params.user_id;

    try {
      const user = await Data.findOne({ where: { id } });
      user.active = !user.active;

      await user.save();

      res.json({
        statusCode: 200,
      });
    } catch (err) {
      res.status(500).json({ error: err });
    }
  },
};
