const { process_sub_group, process_group } = require("../../../models");
const { round } = require("lodash");
const Data = process_sub_group;

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
        description: { [Op.like]: "%" + filter + "%" },
      };
    }

    let whereClause = {
      limit: size,
      offset: page,
      order: [[by, type]],
      include: [process_group],
      where: whereStr,
    };

    try {
      const totalSize = await Data.count();
      const items = await Data.findAll(whereClause);

      res.json({
        statusCode: 200,
        body: items,
        totalSize: totalSize,
        totalPage: round(Number(totalSize) / Number(size)),
      });
    } catch (err) {
      res.status(500).json({ err });
    }

    next();
  },
  getById: async (req, res, next) => {
    const id = req.params.process_sub_group_id;
    try {
      const process_sub_group = await Data.findOne({
        where: { id },
        include: [process_group],
      });
      res.json({
        statusCode: 200,
        body: process_sub_group,
      });
    } catch (err) {
      next(err);
    }
  },
  create: async (req, res, next) => {
    const { group_id, description, order } = req.body;

    try {
      const item = await Data.create({
        group_id,
        description,
        order,
      });

      res.json({
        statusCode: 200,
        body: item,
      });
    } catch (err) {
      next(err);
    }
  },
  update: async (req, res, next) => {
    const id = req.params.process_sub_group_id;
    const { group_id, description, order } = req.body;

    try {
      const item = await Data.findOne({ where: { id } });

      if (id) item.id = id;
      if (id) item.group_id = group_id;
      if (description) item.description = description;
      if (order) item.order = order;

      await item.save();

      res.json({
        statusCode: 200,
        body: item,
      });
    } catch (err) {
      next(err);
    }
  },
  delete: async (req, res, next) => {
    const id = req.params.process_sub_group_id;

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
