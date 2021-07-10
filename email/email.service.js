const SMTP_USER = process.env.SMTP_USER || 'gasbroker.navi@gmail.com';
const EMAIL_DOMAIN = process.env.EMAIL_DOMAIN || 'gasbroker.navi@gmail.com';

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

class EmailService {

  constructor(client) {
    this.client = client
  }

  // Sendgrid input
  // {
  //   to: 'test@example.com',
  //   from: 'test@example.com', // Use the email address or domain you verified above
  //   subject: 'Sending with Twilio SendGrid is Fun',
  //   text: 'and easy to do anywhere, even with Node.js',
  //   html: '<strong>and easy to do anywhere, even with Node.js</strong>',
  // }

  async send(email) {
    if (!email) {
      return null;
    }

    if (!(email.recipient && email.subject && email.text && email.html)) {
      return null;
    }

    return await this.client.send({
      to: email.recipient,
      from: EMAIL_DOMAIN,
      subject: email.subject,
      text: email.text,
      html: email.html,
    });
  }

  async sendBatch(emails) {
    if (!Array.isArray(emails) || !emails.length) {
      return null;
    }

    let results = [];
    for (let i = 0; i < emails.length; i++) {
      if (i % 10 === 0) {
        await sleep(1000);
      }

      let email = emails[i];
      let info = await this.send(email);
      results.push(info);
    }

    return results;
  }

}

module.exports = EmailService;
