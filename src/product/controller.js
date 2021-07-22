const { product, product_item } = require("../../models");
const { Op } = require("sequelize");

const Data = product;

module.exports = {
  getAll: async (req, res, next) => {

    let by = req.query.sortBy == undefined ? "created_at" : req.query.sortBy;
    let type = req.query.sortType == undefined ? "DESC" : req.query.sortType;
    let filter = req.query.filter;

    let whereStr = {};

    if (filter) {
      whereStr = 
          { name: { [Op.like]: "%" + filter + "%" } 
      };
    }

    let whereClause = {
      limit: req.query.size,
      offset: req.query.page,
      order: [[by, type]],
      where: whereStr,
      include : [product_item]
    };

    try {
      const totalCount = await Data.count(); 
      const products = await Data.findAll(whereClause);

      res.json({
        statusCode: 200,
        body: products,
        totalCount: totalCount,
      });
    } catch (err) {
      res.status(500).json({ error: err });
    }

    next();


  },
  getById: async (req, res) => {
    const id = req.params.product_id;
    try {
      const product = await Data.findOne({
        where: { id },
        include : [product_item]
      });
      res.json({
        statusCode: 200,
        body: product,
      });
    } catch (err) {
      res.status(500).json({ error: err });
    }
  },
  create: async (req, res) => {
    const { name, code, unit } = req.body;

    try {
      const product = await Data.create({
        name,
        code,
        unit
      });

      res.json({
        statusCode: 200,
        body: product,
      });
    } catch (err) {
      res.status(500).json({ error: err });
    }
  },
  update: async (req, res) => {
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
      res.status(500).json({ error: err });
    }
  },
  delete: async (req, res) => {
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
      res.status(500).json({ error: err });
    }
  },
};
