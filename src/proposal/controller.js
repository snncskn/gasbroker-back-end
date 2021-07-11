const { proposal, proposal_offer, product, company } = require("../../models");

const Data = proposal;

module.exports = {
  getAll: async (req, res) => {
    try {
      const proposal = await Data.findAll({
        include: [proposal_offer, company, product],
      });
      res.status(200).json({
        statusCode: 200,
        body: proposal,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: err });
    }
  },
  getById: async (req, res) => {
    const id = req.params.proposal_id;
    try {
      const proposal = await Data.findOne({
        where: { id },
        include: [proposal_offer, company, product],
      });
      res.status(200).json({
        statusCode: 200,
        body: proposal,
      });
    } catch (err) {
      console.log(err);
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
    console.log(req.body);

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

      res.status(200).json({
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

      res.status(200).json({
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

      res.status(200).json({
        statusCode: 200,
        body: Data,
      });
    } catch (err) {
      res.status(500).json({ error: err });
    }
  },
};
