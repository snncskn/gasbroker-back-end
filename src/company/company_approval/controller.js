const { company_approval } = require("../../../models");

const Data = company_approval;

module.exports = {
  getApprovalsByCompanyId: async (req, res, next) => {
    try {
      const approvals = await Data.findAll({
        where: { company_id: req.params.company_id },
        order: [['created_at', 'desc']],

      });
      res.json({
        statusCode: 200,
        body: approvals,
      });
    } catch (err) {
      res.status(500).json({ error: err });
    }
    next();
  },
  create: async (req, res) => {
    const { company_id, status, description } = req.body;

    try {
      await Data.create({
        company_id,
        status,
        description,
        approval_user_id: req.headers["user_id"],
      });
      res.json({
        statusCode: 200,
      });
    } catch (err) {
      res.status(500).json({ error: err });
    }
  },
};
