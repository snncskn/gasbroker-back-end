const { company_approval } = require("../../../models");

const Data = company_approval;

module.exports = {
  getApprovalsByCompanyId: async (req, res, next) => {
    try {
      const approvals = await Data.findAll({
        where: { company_id: req.params.company_id },
      });
      res.json({
        statusCode: 200,
        body: approvals,
      });
    } catch (err) {
      next(err);
    }
    next();
  },
  create: async (req, res, next) => {
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
      next(err);
    }
  },
};
