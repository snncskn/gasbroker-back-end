const { process, process_group, process_sub_group } = require("../../models");

const Data = process;

module.exports = {
  getAll: async (req, res) => {
    try {
      const process = await Data.findAll({
        include: [process_group, process_sub_group],
      });
      res.json({
        statusCode: 200,
        body: process,
      });
    } catch (err) {
      res.status(500).json({ error: err });
    }
  },
  getById: async (req, res) => {
    const id = req.params.process_id;
    try {
      const process = await Data.findOne({
        where: { id },
        include: [process_group, process_sub_group],
      });
      res.json({
        statusCode: 200,
        body: process,
      });
    } catch (err) {
      res.status(500).json({ error: err });
    }
  },
  create: async (req, res) => {
    const {
      group_id,
      group_sub_id,
      process_date,
      address,
      latitude,
      longitude,
    } = req.body;

    try {
      const process = await Data.create({
        group_id,
        group_sub_id,
        process_date,
        address,
        latitude,
        longitude,
      });

      res.json({
        statusCode: 200,
        body: process,
      });
    } catch (err) {
      res.status(500).json({ error: err });
    }
  },
  update: async (req, res) => {
    const id = req.params.process_id;
    const {
      group_id,
      group_sub_id,
      process_date,
      address,
      latitude,
      longitude,
    } = req.body;

    try {
      const process = await Data.findOne({ where: { id } });

      if (id) process.id = id;

      if (group_id) process.group_id = group_id;
      if (group_sub_id) process.group_sub_id = group_sub_id;
      if (process_date) process.process_date = process_date;
      if (address) process.address = address;
      if (latitude) process.latitude = latitude;
      if (longitude) process.longitude = longitude;

      await process.save();

      res.json({
        statusCode: 200,
        body: item,
      });
    } catch (err) {
      res.status(500).json({ error: err });
    }
  },
  delete: async (req, res) => {
    const id = req.params.process_id;

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
