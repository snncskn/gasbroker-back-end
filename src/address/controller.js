const { address } = require("../../models");

const Data = address;

module.exports = {
  getByID: async (req, res, next) => {
    const address_id = req.params.address_id;
    try {
      const myaddress = await Data.findOne({
        where: { id: address_id }
      });
      res.json({
        statusCode: 200,
        body: myaddress,
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  },
  getByCompanyId: async (req, res, next) => {
    const company_id = req.params.company_id;
    try {
      const myaddress = await Data.findAll({
        where: { company_id: company_id },
      });
      res.json({
        statusCode: 200,
        body: myaddress,
      });
    } catch (err) {
      next(err);
    }
  },
  create: async (req, res, next) => {
    const { id, description, company_id, title, type, lat, long } = req.body;

    try {
      const myaddress = await Data.create({
        id,
        title,
        description,
        type,
        company_id,
        latitude:lat,
        longitude:long,
      });
      res.json({
        statusCode: 200,
        body: myaddress,
      });
    } catch (err) {
      next(err);
    }
  },

  update: async (req, res, next) => {
    const address_id = req.params.address_id;
    const { is_active, is_deleted, description, title, lat, long} = req.body;
    try {
      
      const myaddress = await Data.findOne({ where: { address_id } });

      if (is_active) myaddress.is_active = is_active;
      if (is_deleted) myaddress.is_deleted = is_deleted;
      if (description) myaddress.description = description;
      if (title) myaddress.title = title;
      if (lat) myaddress.latitude = lat;
      if (long) myaddress.longitude = long;

      await myaddress.save();

      res.json({
        statusCode: 200,
        body: myaddress,
      });
    } catch (err) {
      next(err);
    }
  },
  delete: async (req, res, next) => {
    const id = req.params.address_id;

    try {
      await Data.destroy({
        where: {
          id: id,
        },
      });

      res.json({
        statusCode: 200,
      });
    } catch (err) {
      next(err);
    }
  },
};
