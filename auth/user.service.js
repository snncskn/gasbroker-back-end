const { user, company } = require("../models");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
class UserService {
  constructor() {}

  async userCompany(user_id) {
    if (!user_id) {
      return null;
    }
    const item = await user.findOne({
      where: { user_id: user_id },
      include: [{ model: company, attributes: ["id"] }],
    });
    return item.company_id;
  }
}

module.exports = UserService;
