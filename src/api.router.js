var companyRouter = require('./company/router')
var mediaRouter = require('./media/router')
var parameterRouter = require('./parameter/router')
var vehicleRouter = require('./vehicle/router')
var addressRouter = require('./address/router')
var productRouter = require('./product/router')
var proposalRouter = require('./proposal/router')
var offerRouter = require('./proposal/offer/router')

module.exports = {
    companyRouter,
    mediaRouter,
    parameterRouter,
    vehicleRouter,
    addressRouter,
    productRouter,
    proposalRouter,
    offerRouter
};