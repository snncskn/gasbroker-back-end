class SmsService {

  constructor(smsClient) {
    this.smsClient = smsClient
  }

  async send(message) {
    if (!message) {
      return null;
    }

    if (!(message.recipient && message.body)) {
      return null;
    }

    return await this.smsClient.messages.create({
      body: message.body,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: message.recipient
    });
  }

  async sendBatch(messages) {
    if (!Array.isArray(messages) || !messages.length) {
      return null;
    }

    const promises = messages.map(
      message => this.send(message)
    );
    
    return await Promise.all(promises);
  }

}

module.exports = SmsService;
