var DataTypes = require("sequelize").DataTypes;
var _address = require("./address");
var _company = require("./company");
var _media = require("./media");
var _parameter = require("./parameter");
var _product = require("./product");
var _product_category = require("./product_category");
var _product_category_property = require("./product_category_property");
var _role = require("./role");
var _user = require("./user");
var _user_roles = require("./user_roles");
var _vehicle = require("./vehicle");
var _proposal = require("./proposal");
var _proposal_offer = require("./proposal_offer");

function initModels(sequelize) {
  var address = _address(sequelize, DataTypes);
  var company = _company(sequelize, DataTypes);
  var media = _media(sequelize, DataTypes);
  var parameter = _parameter(sequelize, DataTypes);
  var product = _product(sequelize, DataTypes);
  var product_category = _product_category(sequelize, DataTypes);
  var product_category_property = _product_category_property(sequelize, DataTypes);
  var role = _role(sequelize, DataTypes);
  var user = _user(sequelize, DataTypes);
  var user_roles = _user_roles(sequelize, DataTypes);
  var vehicle = _vehicle(sequelize, DataTypes);
  var proposal = _proposal(sequelize, DataTypes);
  var proposal_offer = _proposal_offer(sequelize, DataTypes);

  return {
    address,
    company,
    media,
    parameter,
    product,
    product_category,
    product_category_property,
    role,
    user,
    user_roles,
    vehicle,
    proposal,
    proposal_offer
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
