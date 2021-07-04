const { db, QueryTypes, product } = require("../../models");

const Data = product;

module.exports = {
  getAll: async (req, res) => {
    try {
      const product = await Data.findAll();
      res.status(200).json({
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
      res.status(200).json({
        statusCode: 200,
        body: product,
      });
    } catch (err) {
      res.status(500).json({ error: err });
    }
  },
  create: async (req, res) => {
    const { name, code } = req.body;

    try {
      const product = await Data.create({
        name,
        code,
      });

      res.status(200).json({
        statusCode: 200,
        body: product,
      });
    } catch (err) {
      res.status(500).json({ error: err });
    }
  },
  update: async (req, res) => {
    const id = req.params.product_id;
    const { name, code } = req.body;

    try {
      const product = await Data.findOne({ where: { id } });

      if (id) product.id = id;
      if (name) product.name = name;
      if (code) product.code = code;

      await product.save();

      res.status(200).json({
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

      res.status(200).json({
        statusCode: 200,
        body: Data,
      });
    } catch (err) {
      res.status(500).json({ error: err });
    }
  },
};
