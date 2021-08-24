const {
  process_item,
  process_group,
  process_sub_group,
} = require("../../../models");
const { round } = require("lodash");
const { Op } = require("sequelize");
const moment = require("moment");

const Data = process_item;

module.exports = {
  getAll: async (req, res, next) => {
    let by = req.query.sortBy == undefined ? "created_at" : req.query.sortBy;
    let type = req.query.sortType == undefined ? "DESC" : req.query.sortType;
    let size = req.query.size == undefined ? 100 : req.query.size;
    let page = req.query.page == undefined ? 0 : req.query.page;

    let filter = req.query.filter;
    let whereStr = {};

    if (filter) {
      whereStr = {
        process_date: {
          [Op.eq]: moment.date(filter, "dd.MM.yyyy"),
        },
      };
    }
    //let myDate = moment(req.body.date).format(“YYYY-MM-DD”);
    let whereClause = {
      limit: size,
      offset: page,
      order: [[by, type]],
      include: [process_group, process_sub_group],
      // where: whereStr
    };

    try {
      const totalSize = await Data.count();
      const process_item = await Data.findAll(whereClause);

      res.json({
        statusCode: 200,
        body: process_item,
        totalSize: totalSize,
        totalPage: round(Number(totalSize) / Number(size)),
      });
    } catch (err) {
      res.status(500).json({ err });
    }

    next();
  },
  getById: async (req, res, next) => {
    const id = req.params.process_item_id;
    try {
      const process_item = await Data.findOne({
        where: { id },
        include: [process_group, process_sub_group],
      });
      res.json({
        statusCode: 200,
        body: process_item,
      });
    } catch (err) {
      next(err);
    }
  },
  getItemsByProcessId: async (req, res, next) => {
    const id = req.params.process_id;
    try {
      const items = await Data.findAll({
        where: { process_id: id },
        include: [process_group, process_sub_group],
        order: [["created_at", "asc"]],
      });
      res.json({
        statusCode: 200,
        body: items,
      });
    } catch (err) {
      next(err);
    }
  },
  create: async (req, res, next) => {
    const {
      process_id,
      group_id,
      group_sub_id,
      process_date,
      address,
      latitude,
      longitude,
    } = req.body;

    try {
      const process_item = await Data.create({
        process_id,
        group_id,
        group_sub_id,
        process_date,
        address,
        latitude,
        longitude,
      });

      res.json({
        statusCode: 200,
        body: process_item,
      });
    } catch (err) {
      next(err);
    }
  },
  update: async (req, res, next) => {
    const id = req.params.process_item_id;
    const {
      process_id,
      group_id,
      group_sub_id,
      process_date,
      address,
      latitude,
      longitude,
    } = req.body;

    try {
      const process_item = await Data.findOne({ where: { id } });

      if (id) process_item.id = id;
      if (process_id) process_item.process_id = process_id;
      if (group_id) process_item.group_id = group_id;
      if (group_sub_id) process_item.group_sub_id = group_sub_id;
      if (process_date) process_item.process_date = process_date;
      if (address) process_item.address = address;
      if (latitude) process_item.latitude = latitude;
      if (longitude) process_item.longitude = longitude;

      await process_item.save();

      res.json({
        statusCode: 200,
        body: process_item,
      });
    } catch (err) {
      next(err);
    }
  },
  delete: async (req, res, next) => {
    const id = req.params.process_item_id;

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
