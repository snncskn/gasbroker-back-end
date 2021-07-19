const { db, QueryTypes, product } = require("../../models");

const Data = product;

module.exports = {
  getAll: async (req, res) => {
    try {
      const product = await Data.findAll();
      res.json({
        statusCode: 200,
        body: product,
      });
    } catch (err) {
      res.status(500).json({ error: err });
    }
  },
  getById: async (req, res) => {
    const id = req.params.product_id;
    try {
      const product = await Data.findOne({
        where: { id },
      });
      res.json({
        statusCode: 200,
        body: product,
      });
    } catch (err) {
      res.status(500).json({ error: err });
    }
  },
  getAllByMainId: async (req, res) => {
    const id = req.params.main_id;
    try {
      const products = await Data.findAll({
        where: { main_id : id },
      });
      res.json({
        statusCode: 200,
        body: products,
      });
    } catch (err) {
      res.status(500).json({ error: err });
    }
  },
  create: async (req, res) => {
    const { name, code, unit, main_id } = req.body;

    try {
      const product = await Data.create({
        name,
        code,
        unit,
        main_id
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
    const { name, code, unit, main_id } = req.body;

    try {
      const product = await Data.findOne({ where: { id } });

      if (id) product.id = id;
      if (name) product.name = name;
      if (code) product.code = code;
      if (unit) product.unit = unit;
      if (main_id) product.main_id = main_id;

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
