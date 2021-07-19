var DataTypes = require("sequelize").DataTypes;
var _address = require("./address");
var _company = require("./company");
var _media = require("./media");
var _parameter = require("./parameter");
var _product = require("./product");
var _role = require("./role");
var _user = require("./user");
var _user_roles = require("./user_roles");
var _vehicle = require("./vehicle");
var _proposal = require("./proposal");
var _proposal_offer = require("./proposal_offer");
var _process = require("./process");
var _process_group = require("./process_group");
var _process_sub_group = require("./process_sub_group");


function initModels(sequelize) {
  var address = _address(sequelize, DataTypes);
  var company = _company(sequelize, DataTypes);
  var media = _media(sequelize, DataTypes);
  var parameter = _parameter(sequelize, DataTypes);
  var product = _product(sequelize, DataTypes);
  var role = _role(sequelize, DataTypes);
  var user = _user(sequelize, DataTypes);
  var user_roles = _user_roles(sequelize, DataTypes);
  var vehicle = _vehicle(sequelize, DataTypes);
  var proposal = _proposal(sequelize, DataTypes);
  var proposal_offer = _proposal_offer(sequelize, DataTypes);
  var process = _process(sequelize, DataTypes);
  var process_group = _process_group(sequelize, DataTypes);
  var process_sub_group = _process_sub_group(sequelize, DataTypes);
  

  return {
    address,
    company,
    media,
    parameter,
    product,
    role,
    user,
    user_roles,
    vehicle,
    proposal,
    proposal_offer,
    process,
    process_group,
    process_sub_group
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
