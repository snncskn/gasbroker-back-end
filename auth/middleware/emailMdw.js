const db = require("../../models");
const email = db.email;

const { emailService } = require("../../email/dependency");

var dotenv = require("dotenv");
dotenv.config();

send = async (req, res, next) => {
  try {
    let info = await emailService.send(emailBody);
    save("email-services-info", emailBody, info);
  } catch (err) {
    save("email-services-error", emailBody, err);
  }

  next();
};

save = async (description, request, response) => {
  try {
    await email.create({
      description,
      request,
      response,
    });
  } catch (err) {
    console.error("error" + err);
  }
};

const emailMdw = {
  send,
};

module.exports = emailMdw;
