const { log } = require("../models");

class LogService {
  constructor() {}

  create(object) {
    try {
      log.create({
        detail: object,
      });
    } catch (err) {
      res.status(500).json({ error: err.stack });
    }
  }
}

module.exports = LogService;
