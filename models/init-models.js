var DataTypes = require("sequelize").DataTypes;
var _address = require("./address");
var _company = require("./company");
var _company_type = require("./company_type");
var _media = require("./media");
var _parameter = require("./parameter");
var _product = require("./product");
var _product_category = require("./product_category");
var _product_category_property = require("./product_category_property");
var _role = require("./role");
var _type = require("./type");
var _user = require("./user");
var _user_roles = require("./user_roles");
var _vehicle = require("./vehicle");

function initModels(sequelize) {
  var address = _address(sequelize, DataTypes);
  var company = _company(sequelize, DataTypes);
  var company_type = _company_type(sequelize, DataTypes);
  var media = _media(sequelize, DataTypes);
  var parameter = _parameter(sequelize, DataTypes);
  var product = _product(sequelize, DataTypes);
  var product_category = _product_category(sequelize, DataTypes);
  var product_category_property = _product_category_property(sequelize, DataTypes);
  var role = _role(sequelize, DataTypes);
  var type = _type(sequelize, DataTypes);
  var user = _user(sequelize, DataTypes);
  var user_roles = _user_roles(sequelize, DataTypes);
  var vehicle = _vehicle(sequelize, DataTypes);

  return {
    address,
    company,
    company_type,
    media,
    parameter,
    product,
    product_category,
    product_category_property,
    role,
    type,
    user,
    user_roles,
    vehicle,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
