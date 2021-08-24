const { proposal, proposal_offer, product, company, media } = require("../../models");
const { round } = require("lodash");
const { Op } = require("sequelize");
const Data = proposal;
const UserService = require("../../auth/user.service");
const userService = new UserService();

module.exports = {
  getAll: async (req, res, next) => {
    let by = req.query.sortBy == undefined ? "created_at" : req.query.sortBy;
    let type = "DESC";//req.query.sortType == undefined ? "DESC" : req.query.sortType;
    let size = req.query.size == undefined ? 100 : req.query.size;
    let page = req.query.page == undefined ? 0 : req.query.page;

    
    const company_id = await userService.userCompany(req.headers["user_id"]);

    let filter = req.query.filter;
     

    let whereStr = { 
       //company_id: { [Op.eq]: company_id },
    };
    if (filter !== '') {
      whereStr.where = {
        $or: [
          {name: {$like: '%' + filter + '%'}}, 
        ]
      };
    }
   

    let whereClause = {
      limit: size,
      offset: page,
      order: [[by, type]],
      include: [proposal_offer, company, product, media],
      where: whereStr
    };

    try {
      const proposal = await Data.findAll(whereClause);
    
      res.json({
        statusCode: 200,
        body: proposal,
        totalSize: proposal.length,
        totalPage: round(Number(proposal.length) / Number(size)),
      });
    } catch (err) {
      next(err);
    }

    next();
  },
  getById: async (req, res, next) => {
    const id = req.params.proposal_id;
    try {
      const proposal = await Data.findOne({
        where: { id },
        include: [proposal_offer, company, product, media],
      });
      res.json({
        statusCode: 200,
        body: proposal,
      });
    } catch (err) {
      next(err);
    }
  },
  create: async (req, res, next) => {
    const {
      company_id,
      proposal_id,
      product_id,
      last_offer_date,
      publish_date,
      product_detail,
      product_quantity,
      location,
      freight_type,
      type,
      status,
      latitude,
      longitude,
    } = req.body;
    try {
      const proposal = await Data.create({
        company_id,
        proposal_id,
        product_id,
        last_offer_date,
        publish_date,
        product_detail,
        product_quantity,
        location,
        freight_type,
        type,
        status,
        latitude,
        longitude,
      });

      res.json({
        statusCode: 200,
        body: proposal,
      });
    } catch (err) {
      next(err);
    }
  },
  update: async (req, res, next) => {
    const id = req.params.proposal_id;
    const {
      company_id,
      proposal_id,
      last_offer_date,
      publish_date,
      product_detail,
      proposal_quantity,
      location,
      freight_type,
      type,
      status,
      latitude,
      longitude,
    } = req.body;

    try {
      const proposal = await Data.findOne({ where: { id } });

      if (id) proposal.id = id;
      //if (company_id) proposal.company_id = company_id;
      //if (proposal_id) proposal.proposal_id = proposal_id;
      if (last_offer_date) proposal.last_offer_date = last_offer_date;
      if (publish_date) proposal.publish_date = publish_date;
      if (product_detail) proposal.product_detail = product_detail;
      if (proposal_quantity) proposal.proposal_quantity = proposal_quantity;
      if (location) proposal.location = location;
      if (freight_type) proposal.freight_type = freight_type;
      if (type) proposal.type = type;
      if (status) proposal.status = status;
      if (latitude) proposal.latitude = latitude;
      if (longitude) proposal.longitude = longitude;
      
      await proposal.save();

      res.json({
        statusCode: 200,
        body: proposal,
      });
    } catch (err) {
      next(err);
    }
  },
  delete: async (req, res, next) => {
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
      next(err);
    }
  },
};
