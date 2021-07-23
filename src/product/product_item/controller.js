const { product_item } = require("../../../models");

const Data = product_item;

module.exports = {
  getAll: async (req, res) => {
    try {
      const item = await Data.findAll();
      res.json({
        statusCode: 200,
        body: item,
      });
    } catch (err) {
      res.status(500).json({ error: err });
    }
  },
  getById: async (req, res) => {
    const id = req.params.product_item_id;
    try {
      const item = await Data.findOne({
        where: { id }
      });
      res.json({
        statusCode: 200,
        body: item,
      });
    } catch (err) {
      res.status(500).json({ error: err });
    }
  },
  create: async (req, res) => {
    const { product_id, quantity,name,unit } = req.body;

    try {
      const item = await Data.create({
        product_id, quantity,name,unit
      });

      res.json({
        statusCode: 200,
        body: item,
      });
    } catch (err) {
      res.status(500).json({ error: err });
    }
  },
  update: async (req, res) => {
    const id = req.params.product_item_id;
    const { product_id, quantity,name,unit } = req.body;

    try {
      const item = await Data.findOne({ where: { id } });

      if (id) item.id = id;
      if (product_id) item.product_id = product_id;
      if (quantity) item.quantity = quantity;
      if (name) item.name = name;
      if (unit) item.unit = unit;

      await item.save();

      res.json({
        statusCode: 200,
        body: item,
      });
    } catch (err) {
      res.status(500).json({ error: err });
    }
  },
  delete: async (req, res) => {
    const id = req.params.product_item_id;

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
