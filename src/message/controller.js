const { message } = require("../../models");

const Data = message;

module.exports = {
  getAll: async (req, res, next) => {
    let whereClause = {
      order: [
        ['message_at', 'ASC'],
        ['message_time', 'ASC'],
      ]
    };

    try {
      const totalSize = await Data.count();
      const myMessages = await Data.findAll(whereClause);

      res.json({
        statusCode: 200,
        body: myMessages,
        totalMessageCount: totalSize,
      });
    } catch (err) {
      next(err);
    }

    next();
  },

  getByProposalId: async (req, res, next) => {
    const proposalId = req.params.proposal_id;
    try {
      const myMessages = await Data.findAll({
        where: { proposal_id: proposalId },
        order: [
          ['message_at', 'ASC'],
          ['message_time', 'ASC'],
        ]
      });
      res.json({
        statusCode: 200,
        body: myMessages,
      });
    } catch (err) {
      next(err);
    }
  },

  getById: async (req, res, next) => {
    const id = req.params.id;
    try {
      const myMessage = await Data.findOne({
        where: { id },
      });
      res.json({
        statusCode: 200,
        body: myMessage,
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  },
  create: async (req, res, next) => {
    const { proposalId, toUserId, fromUserId, unreadCount, muted, message, type } =  req.body;
    try {

      const getTime = () => {
        const d = new Date();
        const dd = [d.getHours(), d.getMinutes(), d.getSeconds()].map((a) =>  a < 10 ? "0" + a : a );
        return dd.join(":");
      };

      const getDate = new Date().toISOString().slice(0, 10);

      const myMessage = await Data.create({
        proposal_id : proposalId,
        to_user_id: toUserId,
        from_user_id: fromUserId,
        unread_count: unreadCount,
        muted,
        message,
        message_at: getDate,
        message_time: getTime(),
        type,
      });
      res.json({
        statusCode: 200,
        body: myMessage,
      });
    } catch (err) {
      res.status(200).json({ error: err.stack });
      next(err);
    }
  },
  update: async (req, res, next) => {
    const id = req.params.message_id;
    const { proposalId, toUserId, fromUserId, unreadCount, muted, message, type } = req.body;
    try {
      const myMessage = await Data.findOne({ where: { id } });
      if (id) myMessage.id = id;
      if (proposalId) myMessage.proposal_id = proposalId;
      if (toUserId) myMessage.to_user_id = toUserId;
      if (fromUserId) myMessage.from_user_id = fromUserId;
      if (unreadCount) myMessage.unread_count = unreadCount;
      if (muted) myMessage.muted = muted;
      if (message) myMessage.message = message;
      if (type) myMessage.type = type;

      await myMessage.save();

      res.json({
        statusCode: 200,
        body: myMessage,
      });
    } catch (err) {
      next(err);
    }
  },
  delete: async (req, res, next) => {
    const id = req.params.message_id;

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
