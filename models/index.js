'use strict';
var dotenv = require('dotenv');
dotenv.config();

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.QueryTypes = Sequelize.QueryTypes
db.db = sequelize // sql kullanılırsa ismi db olarak tasarlansın diye ekledim

db.ROLES = ["user", "admin", "moderator"];

db.role.belongsToMany(db.user, { as: 'userId_users', through: db.user_roles, foreignKey: "roleId", otherKey: "userId" });
db.user.belongsToMany(db.role, { as: 'roleId_roles', through: db.user_roles, foreignKey: "userId", otherKey: "roleId" });
db.address.belongsTo(db.company, { as: "company", foreignKey: "company_id"});
db.company.hasMany(db.address, { as: "addresses", foreignKey: "company_id"});
db.company_types.belongsTo(db.company, { as: "company", foreignKey: "company_id"});
db.company.hasMany(db.company_types, { as: "company_types", foreignKey: "company_id"});
db.vehicle.belongsTo(db.company, { as: "company", foreignKey: "company_id"});
db.company.hasMany(db.vehicle, { as: "vehicles", foreignKey: "company_id"});
db.user_roles.belongsTo(db.role, { as: "role", foreignKey: "roleId"});
db.role.hasMany(db.user_roles, { as: "user_roles", foreignKey: "roleId"});
db.company_types.belongsTo(db.type, { as: "type", foreignKey: "type_id"});
db.type.hasMany(db.company_types, { as: "company_types", foreignKey: "type_id"});
db.user_roles.belongsTo(db.user, { as: "user", foreignKey: "userId"});
db.user.hasMany(db.user_roles, { as: "user_roles", foreignKey: "userId"});


module.exports = db;
