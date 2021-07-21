"use strict";
var dotenv = require("dotenv");
dotenv.config();

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.QueryTypes = Sequelize.QueryTypes;
db.db = sequelize; // sql kullanılırsa ismi db olarak tasarlansın diye ekledim

db.ROLES = ["user", "admin", "moderator"];

db.role.belongsToMany(db.user, {
  as: "userId_users",
  through: db.user_roles,
  foreignKey: "roleId",
  otherKey: "userId",
});
db.user.belongsToMany(db.role, {
  as: "roleId_roles",
  through: db.user_roles,
  foreignKey: "userId",
  otherKey: "roleId",
});
db.address.belongsTo(db.company, { as: "company", foreignKey: "company_id" });
db.company.hasMany(db.address, { as: "addresses", foreignKey: "company_id" });
db.vehicle.belongsTo(db.company, { as: "company", foreignKey: "company_id" });
db.company.hasMany(db.vehicle, { as: "vehicles", foreignKey: "company_id" });
db.user_roles.belongsTo(db.role, { as: "role", foreignKey: "roleId" });
db.role.hasMany(db.user_roles, { as: "user_roles", foreignKey: "roleId" });
db.user_roles.belongsTo(db.user, { as: "user", foreignKey: "userId" });
db.user.hasMany(db.user_roles, { as: "user_roles", foreignKey: "userId" });

db.proposal.belongsTo(db.product, { foreignKey: "product_id" });
db.proposal.belongsTo(db.company, { foreignKey: "company_id" });

db.proposal_offer.belongsTo(db.proposal, { foreignKey: "proposal_id" });
db.proposal.hasMany(db.proposal_offer, { foreignKey: "proposal_id" });

db.process.belongsTo(db.process_group, { foreignKey: "group_id" });
db.process_group.hasMany(db.process, { foreignKey: "group_id" });
db.process_sub_group.belongsTo(db.process_group, { foreignKey: "group_id" });
db.process_group.hasMany(db.process_sub_group, { foreignKey: "group_id" });
db.process.belongsTo(db.process_sub_group, { foreignKey: "group_sub_id" });
db.process_sub_group.hasMany(db.process, { foreignKey: "group_sub_id" });

db.product_item.belongsTo(db.product, { foreignKey: "product_id"});
db.product.hasMany(db.product_item, {  foreignKey: "product_id"});
  

module.exports = db;
