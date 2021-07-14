const { process_group } = require("../../models");

const Data = process_group;

module.exports = {
  getAll: async (req, res) => {
    try {
      const item = await Data.findAll();
      res.status(200).json({
        statusCode: 200,
        body: item,
      });
    } catch (err) {
      res.status(500).json({ error: err });
    }
  },
  getById: async (req, res) => {
    const id = req.params.id;
    try {
      const item = await Data.findOne({
        where: { id },
      });
      res.status(200).json({
        statusCode: 200,
        body: item,
      });
    } catch (err) {
      res.status(500).json({ error: err });
    }
  },
  create: async (req, res) => {
    const { description, order } = req.body;

    try {
      const item = await Data.create({
        name,
        code,
      });

      res.status(200).json({
        statusCode: 200,
        body: item,
      });
    } catch (err) {
      res.status(500).json({ error: err });
    }
  },
  update: async (req, res) => {
    const id = req.params.id;
    const { description, order } = req.body;

    try {
      const item = await Data.findOne({ where: { id } });

      if (id) item.id = id;
      if (description) item.description = description;
      if (order) item.order = order;

      await item.save();

      res.status(200).json({
        statusCode: 200,
        body: item,
      });
    } catch (err) {
      res.status(500).json({ error: err });
    }
  },
  delete: async (req, res) => {
    const id = req.params.id;

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
