const { proposal } = require("../../models");

const Data = proposal;

module.exports = {
  getById: async (req, res) => {
    const id = req.params.vehicle_id;
    const parametre2 = 1;
    try {
      const proposal = await Data.findAll({
        include: "company",
        include: "product",
      });

      res.status(200).json({
        statusCode: 200,
        body: proposal,
      });
    } catch (err) {
      console.log(err);
      res.json({ error: err });
    }
  },
  getAll: async (req, res) => {
    try {
      const proposal = await Data.findAll({
        include: "company",
        include: "product",
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
    const { company_id, name, type, registered_date } = req.body;

    try {
      const proposal = await Data.create({
        company_id,
        name,
        type,
        registered_date,
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
  update: async (req, res) => {
    const id = req.params.proposal_id;
    const { company_id, name, type, registered_date } = req.body;
    try {
      const proposal = await Data.findOne({ where: { id } });
      if (name) proposal.name = name;
      if (id) proposal.id = id;
      if (company_id) proposal.company_id = company_id;
      if (type) proposal.type = type;
      if (registered_date) proposal.registered_date = registered_date;

      await proposal.save();

      res.status(200).json({
        statusCode: 200,
        body: proposal,
      });
    } catch (err) {
      console.log(err);
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
      console.log(err);
      res.status(500).json({ error: err });
    }
  },
};
