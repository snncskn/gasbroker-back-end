function ware(request, response, next) {
  console.log("Logger....."+ request.originalUrl);
}

module.exports = ware;
