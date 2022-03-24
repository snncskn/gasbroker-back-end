const { company_approval, user } = require("../../../models");
const { emailService } = require("../../../email/dependency");

const Data = company_approval;

module.exports = {
  getApprovalsByCompanyId: async (req, res, next) => {
    try {
      const approvals = await Data.findAll({
        where: { company_id: req.params.company_id },
        order: [["created_at", "desc"]],
      });
      res.json({
        statusCode: 200,
        body: approvals,
      });
    } catch (err) {
      next(err);
    }
    next();
  },
  create: async (req, res, next) => {
    const { company_id, status, description } = req.body;

    try {
      await Data.create({
        company_id,
        status,
        description,
        approval_user_id: req.headers["user_id"],
      });

      if ("OK" == status) {
        user.findOne({ where: { user_id: req.headers["user_id"] } })
          .then((usr) => {
            if (!usr) {
              return res.status(404).send({ error: "invalid User" });
            }

            let text = usr.name + " Şirket Güncelleme İşlemi Onay Bekliyor";
            let emailBody = {
              to: process.env.EMAIL_DOMAIN,
              from: usr.email,
              subject: text,
              text: text,
              html: text,
            };

            emailService.send(emailBody);
            
          })
          .catch((err) => {
            next(err);
          });
      }

      res.status(200).json({
        message: "Approval Successfully and Email Sent ",
      });
    } catch (err) {
      next(err);
    }
  },
};
