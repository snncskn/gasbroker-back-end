const EmailClientFactory  = require('./utils/client.factory');
const emailClientFactory = new EmailClientFactory();

const EmailService = require("./email.service");
const emailService = new EmailService(emailClientFactory.getClient());

module.exports = {
    emailService
};
