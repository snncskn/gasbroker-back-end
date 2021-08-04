const {
  process,
  process_group,
  process_sub_group,
} = require("../../models");
const { round } = require("lodash");
const { Op } = require("sequelize");
const moment = require("moment");

const Data = process;

module.exports = {
  getAll: async (req, res, next) => {
    let by = req.query.sortBy == undefined ? "created_at" : req.query.sortBy;
    let type = req.query.sortType == undefined ? "DESC" : req.query.sortType;
    let size = req.query.size == undefined ? 100 : req.query.size;
    let page = req.query.page == undefined ? 0 : req.query.page;

    let filter = req.query.filter;
    let whereStr = {};

    if (filter) {
      whereStr = {};
    }

    let whereClause = {
      limit: size,
      offset: page,
      order: [[by, type]],
      where: whereStr,
    };

    try {
      const totalSize = await Data.count();
      const processes = await Data.findAll(whereClause);

      res.json({
        statusCode: 200,
        body: processes,
        totalSize: totalSize,
        totalPage: round(Number(totalSize) / Number(size)),
      });
    } catch (err) {
      res.status(500).json({ err });
    }

    next();
  },
  getById: async (req, res) => {
    const id = req.params.process_id;
    try {
      const process = await Data.findOne({
        where: { id },
      });
      res.json({
        statusCode: 200,
        body: process,
      });
    } catch (err) {
      res.status(500).json({ error: err });
    }
  },
  getProcessesByProposalId: async (req, res) => {
    const id = req.params.proposal_id;
    try {
      const processes = await Data.findOne({
        where: { proposal_id: id },
      });
      res.json({
        statusCode: 200,
        body: processes,
      });
    } catch (err) {
      res.status(500).json({ error: err });
    }
  },
  create: async (req, res) => {
    const {
      proposal_id,
      voyage_code,
      vendor_id,
      recipient_id,
      broker_id,
      captain_id,
      agency_id,
      loading_master_id,
      description,
    } = req.body;

    try {
      const process = await Data.create({
        proposal_id,
        voyage_code,
        vendor_id,
        recipient_id,
        broker_id,
        captain_id,
        agency_id,
        loading_master_id,
        description,
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
      proposal_id,
      voyage_code,
      vendor_id,
      recipient_id,
      broker_id,
      captain_id,
      agency_id,
      loading_master_id,
      description,
    } = req.body;

    try {
      const process = await Data.findOne({ where: { id } });

      if (id) process.id = id;

      if (proposal_id) process.proposal_id = proposal_id;
      if (voyage_code) process.voyage_code = voyage_code;
      if (vendor_id) process.vendor_id = vendor_id;
      if (recipient_id) process.recipient_id = recipient_id;
      if (broker_id) process.broker_id = broker_id;
      if (captain_id) process.captain_id = captain_id;
      if (agency_id) process.agency_id = agency_id;
      if (loading_master_id) process.loading_master_id = loading_master_id;
      if (description) process.description = description;

      await process.save();

      res.json({
        statusCode: 200,
        body: process,
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
