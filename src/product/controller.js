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
        company_id,
        product_id,
        last_offer_date,
        publish_date,
        product_detail,
        product_quantity,
        location,
        freight_type,
        type,
        status,
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
    const {
      company_id,
      product_id,
      last_offer_date,
      publish_date,
      product_detail,
      product_quantity,
      location,
      freight_type,
      type,
      status,
    } = req.body;

    try {
      const product = await Data.findOne({ where: { id } });

      if (id) product.id = id;
      if (id) product.company_id = company_id;
      if (id) product.product_id = product_id;
      if (id) product.last_offer_date = last_offer_date;
      if (id) product.publish_date = publish_date;
      if (id) product.product_detail = product_detail;
      if (id) product.product_quantity = product_quantity;
      if (id) product.location = location;
      if (id) product.freight_type = freight_type;
      if (id) product.type = type;
      if (id) product.status = status;

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
