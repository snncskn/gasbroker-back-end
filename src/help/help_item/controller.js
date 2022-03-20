const { help_item } = require("../../../models");

const Data = help_item;

module.exports = {
  getAll: async (req, res, next) => {
    try {
      const item = await Data.findAll();
      res.json({
        statusCode: 200,
        body: item,
      });
    } catch (err) {
      next(err);
    }
  },
  getById: async (req, res, next) => {
    const id = req.params.help_item_id;
    try {
      const item = await Data.findOne({
        where: { id }
      });
      res.json({
        statusCode: 200,
        body: item,
      });
    } catch (err) {
      next(err);
    }
  },
  create: async (req, res, next) => {
    const { help_id, head,content,links} = req.body;

    try {
      const item = await Data.create({
        help_id, head,content,links
      });

      res.json({
        statusCode: 200,
        body: item,
      });
    } catch (err) {
      next(err);
    }
  },
  update: async (req, res, next) => {
    const id = req.params.help_item_id;
    const { help_id, head,content,links } = req.body;

    try {
      const item = await Data.findOne({ where: { id } });

      if (id) item.id = id;
      if (help_id) item.help_id = help_id;
      if (head) item.head = head;
      if (content) item.content = content;
      if (links) item.links = links;

      await item.save();

      res.json({
        statusCode: 200,
        body: item,
      });
    } catch (err) {
      next(err);
    }
  },
  delete: async (req, res, next) => {
    const id = req.params.help_item_id;

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
