const { agreement, proposal, message, user } = require("../../models");
const { round } = require("lodash");

const Data = agreement;

const UserService = require("../../auth/user.service");
const userService = new UserService(); 

module.exports = {

  getAll: async (req, res, next) => {
    let by = req.query.sortBy == undefined ? "created_at" : req.query.sortBy;
    let type = req.query.sortType == undefined ? "DESC" : req.query.sortType;
    let size = req.query.size == undefined ? 100 : req.query.size;
    let page = req.query.page == undefined ? 0 : req.query.page;

    let filter = req.query.filter;

    let whereStr = {};

    if (filter) {
      //TODO :
    }

    let whereClause = {
      limit: size,
      offset: page,
      order: [[by, type]],
      where: whereStr,
      include: [
        { model: proposal },
        { model: message, as: "to_message" },
        { model: message, as: "from_message" },
      ]
    };

    try {
      const totalSize = await Data.count();
      const agreements = await Data.findAll(whereClause);

      const onlyUserBasicInfos = await userService.onlyUserBasicInfo();

      agreements.forEach((agree) => {
        agree.approval_user_id = onlyUserBasicInfos.find(value => value.userId == agree.approval_user_id);
      });
 
      res.json({
        statusCode: 200,
        body: agreements,
        totalSize: totalSize,
        totalPage: round(Number(totalSize) / Number(size)),
      });
    } catch (err) {
      next(err);
    }

    next();
  },

  getById: async (req, res, next) => {
    const id = req.params.agreement_id;
    try {
      const agreement = await Data.findOne({
        where: { id },
        include: [
          { model: proposal },
          { model: message, as: "to_message" },
          { model: message, as: "from_message" }
        ]
      });
      res.json({
        statusCode: 200,
        body: agreement,
      });
    } catch (err) {
      next(err);
    }
  },

  getByProposalId: async (req, res, next) => {

    const proposalId = req.params.proposal_id;

    try {
      const agreements = await Data.findAll({
        where: { proposal_id: proposalId },
        order: [
          ['created_at', 'DESC']
        ],
        include: [
          { model: proposal },
          { model: message, as: "to_message" },
          { model: message, as: "from_message" }
        ]
      });

      const onlyUserBasicInfos = await userService.onlyUserBasicInfo();

      agreements.forEach((agree) => {
        agree.approval_user_id = onlyUserBasicInfos.find(value => value.userId == agree.approval_user_id);
      });

      res.json({
        statusCode: 200,
        body: agreements,
      });
    } catch (err) {
      next(err);
    }
  },
  create: async (req, res, next) => {
    const { proposal_id, to_message_id, from_message_id, start_date, end_date, approval_date, approval_user_id } = req.body;

    try {
      const agreement = await Data.create({
        proposal_id, to_message_id, from_message_id, start_date, end_date, approval_date, approval_user_id
      });
      res.json({
        statusCode: 200,
        body: agreement,
      });
    } catch (err) {
      next(err);
    }
  },
  update: async (req, res, next) => {
    const id = req.params.agreement_id;
    const { proposal_id, to_message_id, from_message_id, start_date, end_date, approval_date, approval_user_id } = req.body;
    try {

      const agreement = await Data.findOne({ where: { id } });
      if (id) agreement.id = id;
      if (proposal_id) agreement.proposal_id = proposal_id;
      if (to_message_id) agreement.to_message_id = to_message_id;
      if (from_message_id) agreement.from_message_id = from_message_id;
      if (start_date) agreement.start_date = start_date;
      if (end_date) agreement.end_date = end_date;
      if (approval_date) agreement.approval_date = approval_date;
      if (approval_user_id) agreement.approval_user_id = approval_user_id;

      await agreement.save();

      res.json({
        statusCode: 200,
        body: agreement,
      });
    } catch (err) {
      next(err);
    }
  },
  delete: async (req, res, next) => {
    const id = req.params.agreement_id;

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
  changeActiveStatus: async (req, res, next) => {
    const id = req.params.agreement_id;

    try {
      const agreement = await Data.findOne({ where: { id } });
      agreement.is_active = !agreement.is_active;

      await agreement.save();

      res.json({
        statusCode: 200,
        body: agreement,
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  },
};
