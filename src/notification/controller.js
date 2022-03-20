const { notification, proposal, message } = require("../../models");
const { round } = require("lodash");

const Data = notification;

module.exports = {

  getById: async (req, res, next) => {
    const id = req.params.notification_id;
    try {
      const model = await Data.findOne({
        where: { id },
      });
      res.json({
        statusCode: 200,
        body: model,
      });
    } catch (err) {
      next(err);
    }
  },

  create: async (req, res, next) => {
    const { type, notification, end_date } = req.body;

    try {
      const model = await Data.create({
        type, notification, end_date
      });
      res.json({
        statusCode: 200,
        body: model,
      });
    } catch (err) {
      next(err);
    }
  },
  update: async (req, res, next) => {

    const id = req.params.notification_id;

    const { type, notification, end_date } = req.body;
    try {

      const model = await Data.findOne({ where: { id } });
      if (id) model.id = id;
      if (notification) model.notification = notification;
      if (type) model.type = type;
      if (end_date) model.end_date = end_date;

      await model.save();

      res.json({
        statusCode: 200,
        body: model,
      });
    } catch (err) {
      next(err);
    }
  },

  delete: async (req, res, next) => {
    const id = req.params.notification_id;

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
