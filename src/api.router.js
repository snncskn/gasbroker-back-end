var companyRouter = require("./company/router");
var mediaRouter = require("./media/router");
var parameterRouter = require("./parameter/router");
var vehicleRouter = require("./vehicle/router");
var addressRouter = require("./address/router");
var productRouter = require("./product/router");
var productItemRouter = require("./product/product_item/router");
var proposalRouter = require("./proposal/router");
var offerRouter = require("./proposal/offer/router"); 
var processRouter = require("./process/router"); 
var processItemRouter = require("./process/process_item/router"); 
var processGroupRouter = require("./process/process_group/router"); 
var processSubGroupRouter = require("./process/process_sub_group/router"); 
var menuRouter = require("./menu/router"); 
var companyApprovalRouter = require("./company/company_approval/router"); 

module.exports = {
  companyRouter,
  mediaRouter,
  parameterRouter,
  vehicleRouter,
  addressRouter,
  productRouter,
  productItemRouter,
  proposalRouter,
  offerRouter,
  processRouter,
  processItemRouter,
  processGroupRouter,
  processSubGroupRouter,
  menuRouter,
  companyApprovalRouter
};
