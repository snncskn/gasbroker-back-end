const { vehicle, company } = require("../../models");
const { Op } = require("sequelize");
const { round } = require("lodash");

const Data = vehicle;
const Company = company;

module.exports = {
  getAllBySql: async (req, res) => {
    try {
      const myvehicle = await Data.findAll({ include: "company" });
      res.json({
        statusCode: 200,
        body: myvehicle,
      });
    } catch (err) {
      console.log(err);
      res.json({ error: err });
    }
  },
  getByIdBySql: async (req, res) => {
    const id = req.params.vehicle_id;
    const parametre2 = 1;
    try {
      const myvehicle = await Data.findAll({ include: Company });

      res.json({
        statusCode: 200,
        body: myvehicle,
      });
    } catch (err) {
      console.log(err);
      res.json({ error: err });
    }
  },
  check: async (req, res, next) => {
    res.json({
      statusCode: 200,
      body: JSON.stringify(
        {
          message: "Welcome to gasbroker api",
        },
        null,
        2
      ),
    });
    next();
  },
  getAll: async (req, res, next) => {
    let by = req.query.sortBy == undefined ? "created_at" : req.query.sortBy;
    let type = req.query.sortType == undefined ? "DESC" : req.query.sortType;
    let size = req.query.size == undefined ? 100 : req.query.size;
    let page = req.query.page == undefined ? 0 : req.query.page;

    let filter = req.query.filter;

    let whereStr = {};

    if (filter) {
      whereStr = { name: { [Op.like]: "%" + filter + "%" } };
    }

    let whereClause = {
      limit: size,
      offset: page,
      order: [[by, type]],
      where: whereStr,
      include: [Company],
    };

    try {
      const totalSize = await Data.count();
      const vehicles = await Data.findAll(whereClause);

      res.json({
        statusCode: 200,
        body: vehicles,
        totalSize: totalSize,
        totalPage: round(Number(totalSize) / Number(size)),
      });
    } catch (err) {
      res.status(500).json({ error: err });
    }

    next();
  },
  getByID: async (req, res) => {
    const id = req.params.vehicle_id;
    try {
      const myvehicle = await Data.findOne({
        where: { id },
        include: "company",
      });
      res.json({
        statusCode: 200,
        body: myvehicle,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: err });
    }
  },
  create: async (req, res) => {
    const { company_id, name, type, registered_date } = req.body;

    try {
      const myvehicle = await Data.create({
        company_id,
        name,
        type,
        registered_date,
      });
      res.json({
        statusCode: 200,
        body: myvehicle,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: err.stack });
    }
  },
  update: async (req, res) => {
    const id = req.params.vehicle_id;
    const { company_id, name, type, registered_date } = req.body;
    try {
      const myvehicle = await Data.findOne({ where: { id } });
      if (name) myvehicle.name = name;
      if (id) myvehicle.id = id;
      if (company_id) myvehicle.company_id = company_id;
      if (type) myvehicle.type = type;
      if (registered_date) myvehicle.registered_date = registered_date;

      await myvehicle.save();

      res.json({
        statusCode: 200,
        body: myvehicle,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: err });
    }
  },
  delete: async (req, res, next) => {
    const id = req.params.vehicle_id;

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
  changeActiveStatus: async (req, res) => {
    const id = req.params.vehicle_id;

    try {
      const myvehicle = await Data.findOne({ where: { id } });
      myvehicle.is_active = !myvehicle.is_active;

      await myvehicle.save();

      res.json({
        statusCode: 200,
        body: myvehicle,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: err });
    }
  },
};
