const { proposal, proposal_offer, product, company } = require("../../models");
const { round }  = require("lodash");
const { Op } = require("sequelize");
const Data = proposal;


module.exports = {
  getAll: async (req, res, next) => {
    let by = req.query.sortBy == undefined ? "created_at" : req.query.sortBy;
    let type = req.query.sortType == undefined ? "DESC" : req.query.sortType;
    let size = req.query.size == undefined ? 100 : req.query.size;
    let page = req.query.page == undefined ? 0 : req.query.page;

  console.log(req.headers["user_id"]);
    let filter = req.query.filter;

    let whereStr = {};

    if (filter) {
      whereStr = {
        type: { [Op.like]: "%" + filter + "%" },
      };
    }

    let whereClause = {
    // order: [[by, type]],
      include: [proposal_offer, company, product],
    };

    try {
      const totalSize = await Data.count();
      const proposal = await Data.findAll(whereClause);

      res.json({
        statusCode: 200,
        body: proposal,
        totalSize: totalSize,
        totalPage: round(Number(totalSize) / Number(size)),
      });
    } catch (err) {
      res.status(500).json({ error: err.stack });
    }

    next();
  },
  getById: async (req, res) => {
    const id = req.params.proposal_id;
    try {
      const proposal = await Data.findOne({
        where: { id },
        include: [proposal_offer, company, product],
      });
      res.json({
        statusCode: 200,
        body: proposal,
      });
    } catch (err) {
      res.status(500).json({ error: err });
    }
  },
  create: async (req, res) => {
    const {
      company_id,
      proposal_id,
      product_id,
      last_offer_date,
      publish_date,
      proposal_detail,
      product_quantity,
      location,
      freight_type,
      type,
      status,
    } = req.body;
    try {
      const proposal = await Data.create({
        company_id,
        proposal_id,
        product_id,
        last_offer_date,
        publish_date,
        proposal_detail,
        product_quantity,
        location,
        freight_type,
        type,
        status,
      });

      res.json({
        statusCode: 200,
        body: proposal,
      });
    } catch (err) {
      res.status(500).json({ error: err });
    }
  },
  update: async (req, res) => {
    const id = req.params.proposal_id;
    const {
      company_id,
      proposal_id,
      last_offer_date,
      publish_date,
      proposal_detail,
      proposal_quantity,
      location,
      freight_type,
      type,
      status,
    } = req.body;

    try {
      const proposal = await Data.findOne({ where: { id } });

      if (id) proposal.id = id;
      if (id) proposal.company_id = company_id;
      if (id) proposal.proposal_id = proposal_id;
      if (id) proposal.last_offer_date = last_offer_date;
      if (id) proposal.publish_date = publish_date;
      if (id) proposal.proposal_detail = proposal_detail;
      if (id) proposal.proposal_quantity = proposal_quantity;
      if (id) proposal.location = location;
      if (id) proposal.freight_type = freight_type;
      if (id) proposal.type = type;
      if (id) proposal.status = status;

      await proposal.save();

      res.json({
        statusCode: 200,
        body: proposal,
      });
    } catch (err) {
      res.status(500).json({ error: err });
    }
  },
  delete: async (req, res) => {
    const id = req.params.proposal_id;

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
