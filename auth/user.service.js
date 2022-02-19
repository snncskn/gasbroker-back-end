const { user, company, user_roles, role } = require("../models");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
class UserService {
  constructor() { }

  async user(user_id) {
    if (!user_id) {
      return null;
    }
    const item = await user.findOne({
      where: { user_id: user_id },
      include: [{ model: company, attributes: ["id"] }, { model: user_roles }],
    });
    return item;
  }

  async findUserIdByCompanyId(companyId) {
    const item = await user.findOne({
      where: { 'company_id': companyId},
      attributes: ["user_id"]
    });
    return item.dataValues.user_id;
  }

  async onlyUserBasicInfo() {
    var tmpArray = [];
    await user.findAll().then((users) => {
      users.forEach((user) => {
        tmpArray.push({ userId: user.user_id, name: user.name, email: user.email });
      });
    }).catch((err) => {
      console.log(err);
    });
    return tmpArray;
  }

  async userCompany(user_id) {
    const user = await this.user(user_id);
    return user.company_id;
  }

  async role(user_id) {

    const user = await this.user(user_id)
      .then((usr) => {
        return usr;
      })
      .catch((err) => {
        console.log(err);
      });

    const name = await role.findOne({ where: { id: user.user_roles[0].roleId } })
      .then((role) => {
       return role.name;
      }).catch((err) => {
        console.log(err);
      });

    return name;


  }

  async setRoles(role_id, user_id) {
    await user_roles.create({
      roleId: role_id,
      userId: user_id,
    });
  }
}

module.exports = UserService;
