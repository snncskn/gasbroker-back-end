const db = require("../../models");
const email = db.email;

const { emailService } = require("../../email/dependency");

var dotenv = require("dotenv");
dotenv.config();

send = async (req, res, next) => {
  let emailBody = {
    recipient: "snncskn@msn.com",
    from: process.env.EMAIL_DOMAIN,
    subject: "NODE TEST",
    text: "email.text",
    html: "email.html",
  };

  try {
    let info = await emailService.send(emailBody);
    save("EMAIL SERVICES", emailBody, info);
  } catch (err) {
    console.error("error occur: " + err);
    save("EMAIL SERVICES", emailBody, err);
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
  save,
};
module.exports = emailMdw;
