const { menu } = require("../../models");

const Data = menu;

module.exports = {
  getAll: async (req, res, next) => {
    try { 
      const menus = await Data.findAll();
      res.json({
        statusCode: 200,
        body: menus,
      });
    } catch (err) {
      res.status(500).json({ err });
    }
    next();
  }
};
