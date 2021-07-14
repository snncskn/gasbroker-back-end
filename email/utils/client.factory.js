const { sgMail } = require('./client.sendgrid');
const { awsSesClient } = require('./client.aws');
let EMAIL_CLIENT = process.env.EMAIL_CLIENT || "AWS";

class EmailClientFactory {

    constructor() {
        this.client = this.getClient();
    }
    
    getClient() {
        if(this.client) {
            return this.client;
        }

        if(EMAIL_CLIENT === "AWS") {
            return awsSesClient;
        }
        
        if(EMAIL_CLIENT === "SENDGRID") {
            return sgMail;
        }

        return null;
    }
}

module.exports = EmailClientFactory;