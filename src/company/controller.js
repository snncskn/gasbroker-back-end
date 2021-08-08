const { company, address, media } = require("../../models");
const { Op } = require("sequelize");
const { round } = require("lodash");

const Data = company;

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
      include: [address, media], 
    };

    try {
      const totalSize = await Data.count();
      const companies = await Data.findAll(whereClause);

      res.json({
        statusCode: 200,
        body: companies,
        totalSize: totalSize,
        totalPage: round(Number(totalSize) / Number(size)),
      });
    } catch (err) {
      next(err);
    }

    next();
  },
  getByID: async (req, res, next) => {
    const id = req.params.company_id;
    try {
      const mycompany = await Data.findOne({
        where: { id },
       include: [address, media], 
      });
      res.json({
        statusCode: 200,
        body: mycompany,
      });
    } catch (err) {
      next(err);
    }
  },
  create: async (req, res, next) => {
    const {
      tanent_id,
      name,
      full_name,
      logo_link,
      photos,
      last_login,
      registered_date,
      street,
      city,
      state,
      country,
      latitude,
      longitude,
      map_point,
      gtm,
      phone,
      fax,
      website,
      additional_url,
      email,
      employees,
      founded_in,
      legal_form,
      vat_uid,
      dun,
      linkedin,
      twitter,
      youtube,
      instagram,
      facebook,
      industry,
      technology,
      metarial,
      process,
      types,
      tax_number,
      tax_office,
    } = req.body;

    try {
      let mycompany = await Data.create({
        tanent_id,
        name,
        full_name,
        logo_link,
        photos,
        last_login,
        registered_date,
        street,
        city,
        state,
        country,
        latitude,
        longitude,
        map_point,
        gtm,
        phone,
        fax,
        website,
        additional_url,
        email,
        employees,
        founded_in,
        legal_form,
        vat_uid,
        dun,
        linkedin,
        twitter,
        youtube,
        instagram,
        facebook,
        industry,
        technology,
        metarial,
        process,
        types,
        tax_number,
        tax_office,
      });

      res.json({
        statusCode: 200,
        body: mycompany,
      });
    } catch (err) {
      next(err);
    }
  },
  update: async (req, res, next) => {
    const id = req.params.company_id;
    const {
      tanent_id,
      name,
      full_name,
      logo_link,
      photos,
      last_login,
      registered_date,
      street,
      city,
      state,
      country,
      latitude,
      longitude,
      map_point,
      gtm,
      phone,
      fax,
      website,
      additional_url,
      email,
      employees,
      founded_in,
      legal_form,
      vat_uid,
      dun,
      linkedin,
      twitter,
      youtube,
      instagram,
      facebook,
      industry,
      technology,
      metarial,
      process,
      types,
      tax_number,
      tax_office,
    } = req.body;
    try {
      const mycompany = await Data.findOne({ where: { id } });
      if (tanent_id) mycompany.tanent_id = tanent_id;
      if (name) mycompany.name = name;
      if (full_name) mycompany.full_name = full_name;
      if (logo_link) mycompany.logo_link = logo_link;
      if (photos) mycompany.photos = photos;
      if (last_login) mycompany.last_login = last_login;
      if (registered_date) mycompany.registered_date = registered_date;
      if (street) mycompany.street = street;
      if (city) mycompany.city = city;
      if (state) mycompany.state = state;
      if (country) mycompany.country = country;
      if (latitude) mycompany.latitude = latitude;
      if (longitude) mycompany.longitude = longitude;
      if (map_point) mycompany.map_point = map_point;
      if (gtm) mycompany.gtm = gtm;
      if (phone) mycompany.phone = phone;
      if (fax) mycompany.fax = fax;
      if (website) mycompany.website = website;
      if (additional_url) mycompany.additional_url = additional_url;
      if (email) mycompany.email = email;
      if (employees) mycompany.employees = employees;
      if (founded_in) mycompany.founded_in = founded_in;
      if (legal_form) mycompany.legal_form = legal_form;
      if (vat_uid) mycompany.vat_uid = vat_uid;
      if (dun) mycompany.dun = dun;
      if (linkedin) mycompany.linkedin = linkedin;
      if (twitter) mycompany.twitter = twitter;
      if (youtube) mycompany.youtube = youtube;
      if (instagram) mycompany.instagram = instagram;
      if (facebook) mycompany.facebook = facebook;
      if (industry) mycompany.industry = industry;
      if (technology) mycompany.technology = technology;
      if (metarial) mycompany.metarial = metarial;
      if (process) mycompany.process = process;
      if (types) mycompany.types = types;
      if (tax_number) mycompany.tax_number = tax_number;
      if (tax_office) mycompany.tax_office = tax_office;

      await mycompany.save();

      res.json({
        statusCode: 200,
        body: mycompany,
      });
    } catch (err) {
      next(err);
    }
  },
  delete: async (req, res, next) => {
    const id = req.params.company_id;
    const item = await Data.findOne({ where: { id } });

    try {
      await Data.destroy({
        where: {
          id: id,
        },
      });

      res.json({
        statusCode: 200,
      });

    } catch (err) {
      next(err);
    }
  },
  changeActiveStatus: async (req, res, next) => {
    const id = req.params.company_id;

    try {
      const mycompany = await Data.findOne({ where: { id } });
      mycompany.is_active = !mymedia.is_active;

      await mycompany.save();

      res.json({
        statusCode: 200,
        body: mycompany,
      });
    } catch (err) {
      next(err);
    }
  },
  findByCriteria: async (req, res, next) => {
    try {
      const filter = req.query.filter;
      const page = req.query.page;
      const size = req.query.size;

      const company = await Data.findAll({
        limit: size,
        offset: page,
        where: { full_name: { [Op.like]: "" + filter + "" } },
      });
      res.json({
        statusCode: 200,
        body: company,
      });
    } catch (err) {
      next(err);
    }
  },
};
