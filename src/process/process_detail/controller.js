const {
  process,
  process_detail,
  process_group,
  process_sub_group,
} = require("../../../models");
const { round } = require("lodash");
const { Op } = require("sequelize");
const moment = require("moment");

const Data = process_detail;

module.exports = {
  getAll: async (req, res, next) => {
    let by = req.query.sortBy == undefined ? "created_at" : req.query.sortBy;
    let type = req.query.sortType == undefined ? "DESC" : req.query.sortType;
    let size = req.query.size == undefined ? 100 : req.query.size;
    let page = req.query.page == undefined ? 0 : req.query.page;

    let filter = req.query.filter;
    let whereStr = {};

    if (filter) {
      whereStr = {
        process_date: {
          [Op.eq]: moment.date(filter, "dd.MM.yyyy"),
        },
      };
    }
   
    let whereClause = {
      limit: size,
      offset: page,
      order: [[by, type]],
      include: [process_sub_group],
    };

    try {
      const totalSize = await Data.count();
      const process_detail = await Data.findAll(whereClause);

      res.json({
        statusCode: 200,
        body: process_detail,
        totalSize: totalSize,
        totalPage: round(Number(totalSize) / Number(size)),
      });
    } catch (err) {
      res.status(500).json({ err });
    }

    next();
  },
  getById: async (req, res, next) => {
    const id = req.params.process_detail_id;
    try {
      const process_detail = await Data.findOne({
        where: { id },
        include: [process_sub_group],
      });
      res.json({
        statusCode: 200,
        body: process_detail,
      });
    } catch (err) {
      next(err);
    }
  },
  getItemsByProcessId: async (req, res, next) => {
    const id = req.params.process_id;
    try {
      const details = await Data.findAll({
        where: { process_id: id },
        include: [process_sub_group],
        order: [["created_at", "asc"]],
      });
      res.json({
        statusCode: 200,
        body: details,
      });
    } catch (err) {
      next(err);
    }
  },
  create: async (req, res, next) => {
  },
  
  update: async (req, res, next) => {
    const id = req.params.process_detail_id;
    const {
      process_id,
      group_id,
      group_sub_id,
      captain_process_date,
      agency_process_date,
      lm_process_date,
      captain_media_path,
      agency_media_path,
      lm_media_path
    } = req.body;

    try {
      const process_detail = await Data.findOne({ where: { id } });

      if (id) process_detail.id = id;
      if (process_id) process_detail.process_id = process_id;
      if (group_id) process_detail.group_id = group_id;
      if (group_sub_id) process_detail.group_sub_id = group_sub_id;      
      if (captain_process_date) process_detail.captain_process_date = captain_process_date;
      if (agency_process_date) process_detail.agency_process_date = agency_process_date;
      if (lm_process_date) process_detail.lm_process_date = lm_process_date;
      if (captain_media_path) process_detail.captain_media_path = captain_media_path;
      if (agency_media_path) process_detail.agency_media_path = agency_media_path;
      if (lm_media_path) process_detail.lm_media_path = lm_media_path;
      
      await process_detail.update();

      res.json({
        statusCode: 200,
        body: process_detail,
      });
    } catch (err) {
      next(err);
    }

  },
  match: async (req, res, next) => {
    const id = req.body.id;
    
    if(!id) {
      
            const {
              process_id,
              group_id,
              group_sub_id,
              captain_process_date,
              agency_process_date,
              lm_process_date,
              captain_media_path,
              agency_media_path,
              lm_media_path
            } = req.body;

            try {
              const process_detail = await Data.create({
                process_id,
                group_id,
                group_sub_id,
                captain_process_date,
                agency_process_date,
                lm_process_date,
                captain_media_path,
                agency_media_path,
                lm_media_path
              });

              res.json({
                statusCode: 200,
                body: process_detail,
              });
            } catch (err) {
              next(err);
            }

    } else {
        
          
          const {
            process_id,
            group_id,
            group_sub_id,
            captain_process_date,
            agency_process_date,
            lm_process_date,
            captain_media_path,
            agency_media_path,
            lm_media_path
          } = req.body;
      
          try {
            const process_detail = await Data.findOne({ where: { id } });
      
            if (id) process_detail.id = id;
            if (process_id) process_detail.process_id = process_id;
            if (group_id) process_detail.group_id = group_id;
            if (group_sub_id) process_detail.group_sub_id = group_sub_id;
            
            if (captain_process_date) process_detail.captain_process_date = captain_process_date;
            if (agency_process_date) process_detail.agency_process_date = agency_process_date;
            if (lm_process_date) process_detail.lm_process_date = lm_process_date;
            if (captain_media_path) process_detail.captain_media_path = captain_media_path;
            if (agency_media_path) process_detail.agency_media_path = agency_media_path;
            if (lm_media_path) process_detail.lm_media_path = lm_media_path;
      
            
            await process_detail.update();
      
            res.json({
              statusCode: 200,
              body: process_detail,
            });
          } catch (err) {
            next(err);
          }


    }
  },
  delete: async (req, res, next) => {
    const id = req.params.process_detail_id;

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
