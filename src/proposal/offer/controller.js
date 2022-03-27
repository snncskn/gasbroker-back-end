const { proposal, proposal_offer, company } = require("../../../models");
const Data = proposal_offer;

const UserService = require("../../../auth/user.service");
const userService = new UserService();

module.exports = {
  getAll: async (req, res, next) => {
    try {
      const proposal_offer = await Data.findAll({
        include: [{ model: company, attributes: ["id", "name"] }],
      });
      res.json({
        statusCode: 200,
        body: proposal_offer,
      });
    } catch (err) {
      next(err);
    }
  },
  getById: async (req, res, next) => {
    const id = req.params.offer_id;
    try {
      const proposal_offer = await Data.findOne({
        where: { id },
        include: [{ model: company, attributes: ["id", "name"] }],
      });
      res.json({
        statusCode: 200,
        body: proposal_offer,
      });
    } catch (err) {
      next(err);
    }
  },
  getOffersByProposalId: async (req, res, next) => {
    const id = req.params.proposal_id;
    try { 

      const itemProposal = await proposal.findOne({
        where: { 'id': id}
      });

      const company_id = await userService.userCompany(req.headers["user_id"]);
      const role_name = await userService.role(req.headers["user_id"]);

      let whereStr = {};

      if("admin" == role_name) {
        whereStr = { proposal_id: id};
      } else {
        
        if(itemProposal?.company_id !== company_id) {
          whereStr = { proposal_id: id,company_id: company_id };
        } else {
          whereStr = { proposal_id: id };
        }

      }

     
      const proposal_offer = await Data.findAll({
        where: whereStr,
        include: [{ model: company, attributes: ["id", "name"] }],
      });

      res.json({
        statusCode: 200,
        body: proposal_offer,
      });
    } catch (err) {
      next(err);
    }
  },
  create: async (req, res, next) => {
    const {
      proposal_id,
      company_id,
      offer_date,
      payment_type,
      price,
      deal_status,
      currency,
    } = req.body;

    try {
      const proposal_offer = await Data.create({
        proposal_id,
        company_id: req.headers["company_id"],
        offer_date,
        payment_type,
        price,
        deal_status,
        currency,
      });

      res.json({
        statusCode: 200,
        body: proposal_offer,
      });
    } catch (err) {
      next(err);
    }
  },
  update: async (req, res, next) => {
    const id = req.params.offer_id;
    const {
      proposal_id,
      company_id,
      offer_date,
      payment_type,
      price,
      currency,
      deal_status,
    } = req.body;

    try {
      const proposal_offer = await Data.findOne({ where: { id } });

      if (id) proposal_offer.id = id;
      if (proposal_id) proposal_offer.proposal_id = proposal_id;
      if (company_id) proposal_offer.company_id = company_id;
      if (offer_date) proposal_offer.offer_date = offer_date;
      if (payment_type) proposal_offer.payment_type = payment_type;
      if (price) proposal_offer.price = price;
      if (currency) proposal_offer.currency = currency;
      if (deal_status) proposal_offer.deal_status = deal_status;

      await proposal_offer.save();

      res.json({
        statusCode: 200,
        body: proposal_offer,
      });
    } catch (err) {
      next(err);
    }
  },
  delete: async (req, res, next) => {
    const id = req.params.offer_id;

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
