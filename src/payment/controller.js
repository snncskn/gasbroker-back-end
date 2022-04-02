const { payment, company, user } = require("../../models");

const Data = payment;

module.exports = {

  getAll: async (req, res, next) => {

    let by = req.query.sortBy == undefined ? "created_at" : req.query.sortBy;
    let type = req.query.sortType == undefined ? "DESC" : req.query.sortType;
    let size = Number(req.query.size == undefined ? 100 : req.query.size);
    let page = Number(req.query.page == undefined || "0" ? 0 : req.query.page);

    let filter = req.query.filter;

    let whereStr = {};

    if (filter) {
      whereStr = {
        [Op.or]: [
          { name: { [Op.like]: "%" + filter + "%" } },
          { full_name: { [Op.like]: "%" + filter + "%" } },
        ],
      };
    }

    let whereClause = {
      limit: size,
      offset: page,
      order: [[by, type]],
      where: whereStr,
      include: [company, user],
    };

    try {
      const totalSize = await Data.count();
      const payments = await Data.findAll(whereClause);

      res.json({
        statusCode: 200,
        body: payments,
        totalSize: totalSize,
        totalPage: round(Number(totalSize) / Number(size)),
      });
    } catch (err) {
      next(err);
    }

    next();
  },


  create: async (req, res, next) => {
    const { company_id, name_surname, iban, email, phone, address, notes, process_date } = req.body;

    try {
      const payment = await Data.create({
        company_id, name_surname, iban, email, phone, address, notes, process_date, user_id: req.headers["user_id"],
      });

      res.json({
        statusCode: 200,
        body: payment,
      });


    } catch (err) {
      next(err);
    }
  },

  getById: async (req, res, next) => {
    const id = req.params.payment_id;
    try {
      const payment = await Data.findOne({
        where: { id },
        include: [company, user],
      });
      res.json({
        statusCode: 200,
        body: payment,
      });
    } catch (err) {
      next(err);
    }
  },

  update: async (req, res, next) => {

    const id = req.params.payment_id;
    const { company_id, name_surname, iban, email, phone, address, notes, process_date } = req.body;

    try {

      const payment = await Data.findOne({ where: { id } });

      if (id) payment.id = id;
      if (company_id) payment.company_id = company_id;
      if (name_surname) payment.name_surname = name_surname;
      if (iban) payment.iban = iban;
      if (email) payment.email = email;
      if (phone) payment.phone = phone;
      if (address) payment.address = address;
      if (notes) payment.notes = notes;
      if (process_date) payment.process_date = process_date;

      payment.user_id = req.headers["user_id"];

      await payment.save();

      res.json({
        statusCode: 200,
        body: payment,
      });
    } catch (err) {
      next(err);
    }
  },

  delete: async (req, res, next) => {
    const id = req.params.payment_id;

    try {
      await Data.destroy({
        where: {
          id: id,
        },
      });

      res.json({
        statusCode: 200,
        body: Data,
      });
    } catch (err) {
      next(err);
    }
  },

};
