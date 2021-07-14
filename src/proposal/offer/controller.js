const { proposal_offer } = require("../../../models");
const Data = proposal_offer;

module.exports = {
  getAll: async (req, res) => {
    try {
      const proposal_offer = await Data.findAll();
      res.status(200).json({
        statusCode: 200,
        body: proposal_offer,
      });
    } catch (err) {
      res.status(500).json({ error: err });
    }
  },
  getById: async (req, res) => {
    const id = req.params.offer_id;
    try {
      const proposal_offer = await Data.findOne({
        where: { id }
      });
      res.status(200).json({
        statusCode: 200,
        body: proposal_offer,
      });
    } catch (err) {
      res.status(500).json({ error: err });
    }
  },
  getOffersByProposalId: async (req, res) => {
    const id = req.params.proposal_id;
    try {
      const proposal_offer = await Data.findAll({
        where: { proposal_id : id },
      });
      res.status(200).json({
        statusCode: 200,
        body: proposal_offer,
      });
    } catch (err) {
      res.status(500).json({ error: err });
    }
  },
  create: async (req, res) => {
    const { proposal_id, offer_date, payment_type, price, deal_status } =
      req.body;

    try {
      const proposal_offer = await Data.create({
        proposal_id,
        offer_date,
        payment_type,
        price,
        deal_status,
      });

      res.status(200).json({
        statusCode: 200,
        body: proposal_offer,
      });
    } catch (err) {
      res.status(500).json({ error: err });
    }
  },
  update: async (req, res) => {
    const id = req.params.offer_id;
    const { proposal_id, offer_date, payment_type, price, deal_status } =
      req.body;

    try {
      const proposal_offer = await Data.findOne({ where: { id } });

      if (id) proposal.id = id;
      if (id) proposal.proposal_id = proposal_id;
      if (id) proposal.offer_date = offer_date;
      if (id) proposal.payment_type = payment_type;
      if (id) proposal.price = price;
      if (id) proposal.deal_status = deal_status;

      await proposal_offer.save();

      res.status(200).json({
        statusCode: 200,
        body: proposal_offer,
      });
    } catch (err) {
      res.status(500).json({ error: err });
    }
  },
  delete: async (req, res) => {
    const id = req.params.offer_id;

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
