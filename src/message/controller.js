const { message } = require("../../models");

const Data = message;

module.exports = {
  getAll: async (req, res, next) => {
    let by = req.query.sortBy == undefined ? "message_at" : req.query.sortBy;
    let type = req.query.sortType == undefined ? "DESC" : req.query.sortType;

    let whereClause = {
      order: [[by, type]],
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
    const { toUserId, fromUserId, unreadCount, muted, message } = req.body;
    try {
      const myMessage = await Data.create({
        to_user_id: toUserId,
        from_user_id: fromUserId,
        unread_count: unreadCount,
        muted,
        message        
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
    const { toUserId, fromUserId, unreadCount, muted, message } = req.body;
    try {
      const myMessage = await Data.findOne({ where: { id } });
      if (id) myMessage.id = id;
      if (toUserId) myMessage.to_user_id = toUserId;
      if (fromUserId) myMessage.from_user_id = fromUserId;
      if (unreadCount) myMessage.unread_count = unreadCount;
      if (muted) myMessage.muted = muted;
      if (message) myMessage.message = message;
      
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
