// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');

let accessKeyId = process.env.AWS_ACCESS_KEY_ID;
let secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
let awsRegion = process.env.AWS_REGION;
let credentials = new AWS.Credentials(accessKeyId, secretAccessKey, sessionToken = null);

AWS.config.update({
    region: awsRegion,
    credentials: credentials
});

class AwsSesClient {

    constructor() {
        this.ses = new AWS.SES({ apiVersion: '2010-12-01' });
    }

    async send(options) {
        let params = {
            Destination: { /* required */
                CcAddresses: [],
                ToAddresses: [options.to]
            },
            Message: { /* required */
                Body: { /* required */
                    Html: {
                        Charset: "UTF-8",
                        Data: options.html
                    },
                    Text: {
                        Charset: "UTF-8",
                        Data: options.text
                    }
                },
                Subject: {
                    Charset: 'UTF-8',
                    Data: options.subject
                }
            },
            Source: options.from,
            ReplyToAddresses: [
                options.from
            ],
        };
        return this.ses.sendEmail(params).promise();
    }

}

let awsSesClient = new AwsSesClient();

module.exports = {
    awsSesClient
};