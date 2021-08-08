function ware(request, response, next) {
  console.log("Logger....."+ request.originalUrl);
  next();
}

module.exports = ware;
