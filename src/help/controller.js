const { help, help_item } = require("../../models");
const { Op } = require("sequelize");
const { round } = require("lodash");

const Data = help;

module.exports = {
  getAll: async (req, res, next) => {
    let by = req.query.sortBy == undefined ? "created_at" : req.query.sortBy;
    let type = req.query.sortType == undefined ? "DESC" : req.query.sortType;
    let size = req.query.size == undefined ? 100 : req.query.size;
    let page = req.query.page == undefined ? 0 : req.query.page;

    let filter = req.query.filter;

    let whereStr = {};
    if (filter) {
      whereStr = { name: { [Op.like]: "%" + filter + "%" } };
    }

    let whereClause = {
      limit: size,
      offset: page,
      order: [[by, type]],
      where: whereStr,
      include: [help_item],
    };

    try {
      const totalSize = await Data.count();
      const helps = await Data.findAll(whereClause);

      res.json({
        statusCode: 200,
        body: helps,
        totalSize: totalSize,
        totalPage: round(Number(totalSize) / Number(size)),
      });
    } catch (err) {
      res.status(500).json({ err });
    }

    next();
  },

  getById: async (req, res, next) => {
    const id = req.params.help_id;
    try {
      const help = await Data.findOne({
        where: { id },
        include: [help_item],
      });
      res.json({
        statusCode: 200,
        body: help,
      });
    } catch (err) {
      next(err);
    }
  },
  create: async (req, res, next) => {
    const { code, head } = req.body;

    try {
      const help = await Data.create({
        code,
        head,
      });

      res.json({
        statusCode: 200,
        body: help,
      });
    } catch (err) {
      next(err);
    }
  },
  update: async (req, res, next) => {
    const id = req.params.help_id;
    const { code, head } = req.body;

    try {
      const help = await Data.findOne({ where: { id } });

      if (id) help.id = id;
      if (code) help.code = code;
      if (head) help.head = head;

      await help.save();

      res.json({
        statusCode: 200,
        body: help,
      });
    } catch (err) {
      next(err);
    }
  },
  delete: async (req, res, next) => {
    const id = req.params.help_id;

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
      next(err);
    }
  },
};
