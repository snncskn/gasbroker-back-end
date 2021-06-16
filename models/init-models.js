var DataTypes = require("sequelize").DataTypes;
var _company = require("./company");
var _media = require("./media");
var _parameter = require("./parameter");
var _user = require("./user");
var _users = require("./users");

function initModels(sequelize) {
  var company = _company(sequelize, DataTypes);
  var media = _media(sequelize, DataTypes);
  var parameter = _parameter(sequelize, DataTypes);
  var user = _user(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);


  return {
    company,
    media,
    parameter,
    user,
    users,
  };
}


module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
