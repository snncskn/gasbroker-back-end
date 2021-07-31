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

db.address.belongsTo(db.company, { foreignKey: "company_id" });
db.company.hasMany(db.address, { foreignKey: "company_id" });
db.media.belongsTo(db.company, { foreignKey: "company_id" });
db.company.hasOne(db.media, { foreignKey: "company_id" });
db.proposal_offer.belongsTo(db.company, { foreignKey: "company_id" });
db.company.hasMany(db.proposal_offer, { foreignKey: "company_id" });
db.user.belongsTo(db.company, { foreignKey: "company_id" });
db.company.hasMany(db.user, { foreignKey: "company_id" });
db.vehicle.belongsTo(db.company, { foreignKey: "company_id" });
db.company.hasMany(db.vehicle, { foreignKey: "company_id" });
db.process_item.belongsTo(db.process, { foreignKey: "process_id" });
db.process.hasMany(db.process_item, { foreignKey: "process_id" });
db.process_item.belongsTo(db.process_group, { foreignKey: "group_id" });
db.process_group.hasMany(db.process_item, { foreignKey: "group_id" });
db.process_sub_group.belongsTo(db.process_group, { foreignKey: "group_id" });
db.process_group.hasMany(db.process_sub_group, { foreignKey: "group_id" });
db.process_item.belongsTo(db.process_sub_group, { foreignKey: "group_sub_id" });
db.process_sub_group.hasMany(db.process_item, { foreignKey: "group_sub_id" });
db.product_item.belongsTo(db.product, { foreignKey: "product_id" });
db.product.hasMany(db.product_item, { foreignKey: "product_id" });
db.process.belongsTo(db.proposal, { foreignKey: "proposal_id" });
db.proposal.hasMany(db.process, { foreignKey: "proposal_id" });
db.proposal_offer.belongsTo(db.proposal, { foreignKey: "proposal_id" });
db.proposal.hasMany(db.proposal_offer, { foreignKey: "proposal_id" });
db.user_roles.belongsTo(db.role, { foreignKey: "roleId" });
db.role.hasMany(db.user_roles, { foreignKey: "roleId" });
db.media.belongsTo(db.user, { foreignKey: "user_id" });
db.user.hasOne(db.media, { foreignKey: "user_id" });
db.user_roles.belongsTo(db.user, { foreignKey: "userId" });
db.user.hasMany(db.user_roles, { foreignKey: "userId" });
db.media.belongsTo(db.vehicle, { foreignKey: "vehicle_id" });
db.vehicle.hasMany(db.media, { foreignKey: "vehicle_id" });

db.process.belongsTo(db.company, { as: "agency", foreignKey: "agency_id"});
db.company.hasMany(db.process, { as: "processes", foreignKey: "agency_id"});
db.process.belongsTo(db.company, { as: "broker", foreignKey: "broker_id"});
db.company.hasMany(db.process, { as: "broker_processes", foreignKey: "broker_id"});
db.process.belongsTo(db.company, { as: "captain", foreignKey: "captain_id"});
db.company.hasMany(db.process, { as: "captain_processes", foreignKey: "captain_id"});
db.process.belongsTo(db.company, { as: "loading_master", foreignKey: "loading_master_id"});
db.company.hasMany(db.process, { as: "loading_master_processes", foreignKey: "loading_master_id"});
db.process.belongsTo(db.company, { as: "recipient", foreignKey: "recipient_id"});
db.company.hasMany(db.process, { as: "recipient_processes", foreignKey: "recipient_id"});
db.process.belongsTo(db.company, { as: "vendor", foreignKey: "vendor_id"});
db.company.hasMany(db.process, { as: "vendor_processes", foreignKey: "vendor_id"});
db.proposal.belongsTo(db.company, { as: "company", foreignKey: "company_id"});
db.company.hasMany(db.proposal, { as: "proposals", foreignKey: "company_id"});

db.proposal.belongsTo(db.product, { foreignKey: "product_id"});
db.product.hasMany(db.proposal, {  foreignKey: "product_id"});

module.exports = db;
