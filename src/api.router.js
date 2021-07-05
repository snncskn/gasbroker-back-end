var companyRouter = require('./company/router')
var mediaRouter = require('./media/router')
var parameterRouter = require('./parameter/router')
var vehicleRouter = require('./vehicle/router')
var addressRouter = require('./address/router')
var typeRouter = require('./type/router')
var productRouter = require('./product/router')

module.exports = {
    companyRouter,
    mediaRouter,
    parameterRouter,
    vehicleRouter,
    addressRouter,
    typeRouter,
    productRouter
};