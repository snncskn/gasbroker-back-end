const { product, product_item, media } = require("../../models");
const { Op } = require("sequelize");
const { round } = require("lodash");

const Data = product;

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
      include: [product_item, media],
    };

    try {
      const totalSize = await Data.count();
      const products = await Data.findAll(whereClause);

      res.json({
        statusCode: 200,
        body: products,
        totalSize: totalSize,
        totalPage: round(Number(totalSize) / Number(size)),
      });
    } catch (err) {
      res.status(500).json({ err });
    }

    next();
  },

  getById: async (req, res, next) => {
    const id = req.params.product_id;
    try {
      const product = await Data.findOne({
        where: { id },
        include: [product_item, media],
      });
      res.json({
        statusCode: 200,
        body: product,
      });
    } catch (err) {
      next(err);
    }
  },
  create: async (req, res, next) => {
    const { name, code, unit } = req.body;

    try {
      const product = await Data.create({
        name,
        code,
        unit,
      });

      res.json({
        statusCode: 200,
        body: product,
      });
    } catch (err) {
      next(err);
    }
  },
  update: async (req, res, next) => {
    const id = req.params.product_id;
    const { name, code, unit } = req.body;

    try {
      const product = await Data.findOne({ where: { id } });

      if (id) product.id = id;
      if (name) product.name = name;
      if (code) product.code = code;
      if (unit) product.unit = unit;

      await product.save();

      res.json({
        statusCode: 200,
        body: product,
      });
    } catch (err) {
      next(err);
    }
  },
  delete: async (req, res, next) => {
    const id = req.params.product_id;

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
