const joi = require('joi');

class EmailController {

  constructor(emailService) {
    this.emailService = emailService;
  }

  async heartbeat(req, res, next) {
    res.send("Email notifiation service is still alive!");
  }

  async send(req, res, next) {
    const schema = joi.object().keys({
      recipient: joi.string().required(),
      subject: joi.string().required(),
      text: joi.string().required(),
      html: joi.string().required(),
    });

    const validationResult = schema.validate(req.body, { abortEarly: false });

    if (validationResult.error) {
      const { details } = validationResult.error;
      const message = details.map(i => i.message).join(',');
      console.warn("[Email - send] ", message);
      return res.status(422).send(message);
    }

    try {
      let info = await this.emailService.send(req.body);
      res.status(200).send({
        msg: "200 Send email success.",
        me: "gas-broker",
        data: info
      });
    } catch (err) {
      console.error("error occur: " + err);
      res.status(500).send({
        msg: "500 Send email failed.",
        me: "gas-broker",
        data: ""
      });
    }
  }

  async sendBatch(req, res, next) {
    const emailSchema = joi.object().keys({
      recipient: joi.string().required(),
      subject: joi.string().required(),
      text: joi.string().required(),
      html: joi.string().required(),
    });

    const schema = joi.array().items(emailSchema).has(emailSchema);

    const validationResult = schema.validate(req.body, { abortEarly: false });

    if (validationResult.error) {
      const { details } = validationResult.error;
      const message = details.map(i => i.message).join(',');
      console.warn("[Email - sendBatch] ", message);
      return res.status(422).send(message);
    }

    try {
      let info = await this.emailService.sendBatch(req.body);
      res.status(200).send({
        msg: "200 Batch send email success.",
        me: "gas-broker",
        data: info
      });
    } catch (err) {
      console.error("error occur: " + err);
      res.status(500).send({
        msg: "500 Batch send email failed.",
        me: "gas-broker",
        data: ""
      });
    }
  }

}

module.exports = EmailController;
