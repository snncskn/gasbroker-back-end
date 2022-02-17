const { db, QueryTypes, message, media } = require('../../models')

const UserService = require("../../auth/user.service");
const userService = new UserService();

const proposalController = require('../proposal/controller');

const Data = message;

module.exports = {
  getAll: async (req, res, next) => {

    var tmpArray = [];
    await userService.onlyUserBasicInfo().then((datas) => {
      datas.forEach((message) => {
        tmpArray.push({ userId: message.user_id, name: message.name, email: message.email });
      });
    }).catch((err) => {
      console.log(err);
    });

    let whereClause = {
      order: [
        ['message_at', 'ASC'],
        ['message_time', 'ASC'],
      ],
      include: [media]
    };

    try {
      const totalSize = await Data.count();
      const myMessages = await Data.findAll(whereClause);

      myMessages.forEach((message) => {
        message.to_user_id = tmpArray.filter(value => value.userId == message.to_user_id);
        message.from_user_id = tmpArray.filter(value => value.userId == message.from_user_id);
      });

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
    var tmpArray = [];
    await userService.onlyUserBasicInfo().then((datas) => {
      datas.forEach((message) => {
        tmpArray.push({ userId: message.user_id, name: message.name, email: message.email });
      });
    }).catch((err) => {
      console.log(err);
    });

    const proposalId = req.params.proposal_id;

    const tmpPropsal = await proposalController.findById(proposalId).then(prp => {
      console.log(prp);
    });

    try {
      const myMessages = await Data.findAll({
        where: { proposal_id: proposalId },
        order: [
          ['message_at', 'ASC'],
          ['message_time', 'ASC'],
        ],
        include: [media]
      });

      myMessages.forEach((message) => {
        message.to_user_id = tmpArray.filter(value => value.userId == message.to_user_id);
        message.from_user_id = tmpArray.filter(value => value.userId == message.from_user_id);
      });

      res.json({
        statusCode: 200,
        body: myMessages,
      });
    } catch (err) {
      next(err);
    }
  },

  getMessagesByUserlId: async (req, res, next) => {
    try {
      const myMessages = await Data.findAll({
        where: { from_user_id: req.headers["user_id"] },
        order: [
          ['message_at', 'ASC'],
          ['message_time', 'ASC'],
        ],
        include: [media]
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
        include: [media]
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
    const { proposalId, toUserId, fromUserId, unreadCount, muted, message, type } = req.body;
    try {
      const getTime = () => {
        const d = new Date();
        const dd = [d.getHours(), d.getMinutes(), d.getSeconds()].map((a) => a < 10 ? "0" + a : a);
        return dd.join(":");
      };

     // const tmpPropsal = proposalController.findById(proposalId);

      const myMessage = await Data.create({
        proposal_id: proposalId,
        to_user_id: toUserId,
        from_user_id: fromUserId,
        unread_count: unreadCount,
        muted,
        message,
        message_at: new Date(),
        message_time: getTime(),
        type,
      });

      var onlyUserBasicInfos = [];
      await userService.onlyUserBasicInfo().then((datas) => {
        datas.forEach((user) => {
          onlyUserBasicInfos.push({ userId: user.user_id, name: user.name, email: user.email });
        });
      }).catch((err) => {
        console.log(err);
      });

      myMessage.dataValues.fromUser = onlyUserBasicInfos.find(value => value.userId === myMessage.from_user_id);

      res.json({
        statusCode: 200,
        body: myMessage,
      });

      console.log(myMessage);
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
  getByProposalIdWithQuery: async (req, res, next) => {
    const proposalId = req.params.proposal_id;
    try {
      const [data, meta] =
        await db.query(
          " SELECT message.id, message.proposal_id, message.to_user_id, message.from_user_id, message.unread_count, message.muted, message.message, " +
          " message.message_at, message.message_time, message.type, \"user\".name as name, \"user\".email AS email, \"user\".username AS username " +
          " FROM public.message AS message INNER JOIN  public.user AS \"user\" ON message.to_user_id = \"user\".user_id AND (\"user\".deleted_at IS NULL) " +
          " AND message.proposal_id = :proposal_id" +
          " ORDER BY message.message_at ASC, message.message_time ASC ",
          {
            replacements: {
              proposal_id: proposalId
            },
            type: QueryTypes.SELECT
          }
        );
      res.json({
        statusCode: 200,
        body: data
      })
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
