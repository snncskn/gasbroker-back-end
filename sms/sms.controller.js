const joi = require('joi');

class SmsController {

  constructor(smsService) {
    this.smsService = smsService;
  }

  async heartbeat(req, res, next) {
    res.send("Sms notifiation service is still alive!");
  }

  async send(req, res, next) {
    const schema = joi.object().keys({
      recipient: joi.string().required(),
      body: joi.string().required(),
    });

    const validationResult = schema.validate(req.body, { abortEarly: false });

    if (validationResult.error) {
      const { details } = validationResult.error;
      const message = details.map(i => i.message).join(',');
      console.warn("[SMS - send] ", message);
      return res.status(422).send(message);
    }

    try {
      let info = await this.smsService.send(req.body);
      res.status(200).send({
        msg: "200 Send sms success.",
        me: "gas-broker",
        data: info
      });
    } catch (err) {
      console.error("error occur: " + err);
      res.status(500).send({
        msg: "500 Send sms failed.",
        me: "gas-broker",
        data: ""
      });
    }
  }

  async sendBatch(req, res, next) {
    const smsSchema = joi.object().keys({
      recipient: joi.string().required(),
      body: joi.string().required(),
    });

    const schema = joi.array().items(smsSchema).has(smsSchema);

    const validationResult = schema.validate(req.body, { abortEarly: false });

    if (validationResult.error) {
      const { details } = validationResult.error;
      const message = details.map(i => i.message).join(',');
      console.warn("[SMS - sendBatch] ", message);
      return res.status(422).send(message);
    }

    try {
      let info = await this.smsService.sendBatch(req.body);
      res.status(200).send({
        msg: "200 Batch send sms success.",
        me: "gas-broker",
        data: info
      });
    } catch (err) {
      console.error("error occur: " + err);
      res.status(500).send({
        msg: "500 Batch send sms failed.",
        me: "gas-broker",
        data: ""
      });
    }
  }

}

module.exports = SmsController;
