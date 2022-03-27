const { db, proposal, proposal_offer, company, product } = require("../../models");
const { Op, sequelize } = require("sequelize");


module.exports = {
    getAllCompanyProcess: async (req, res, next) => {
        try {
            const companyProcess = " select c.full_name, c.phone  , c.email , ca.status , ca.description, ca.created_at " +
                " from public.company c, public.company_approval ca  " +
                " where ca.company_id = c.id and c.deleted_at  is null  order by  created_at desc, full_name ";
            const data = await db.query(companyProcess);
            res.json({
                statusCode: 200,
                body: data
            })
        } catch (err) {
            next(err);
        }
    },

    getOffers: async (req, res, next) => {

        try {

            const datas = await proposal_offer.findAll({
                order: [
                    ['created_at', 'desc'],
                    ['proposal_id', 'asc']
                ],
                include: [
                    { model: company, attributes: ["name"] },
                    {
                        model: proposal, attributes: ["type", "publish_date", "last_offer_date", "product_detail", "product_quantity"],
                        include: [
                            { model: company, attributes: ["name"] },
                            { model: product, attributes: ["name", "code", "unit"] }
                        ]
                    },
                ],
            });

            res.json({
                statusCode: 200,
                body: datas,
            });

        } catch (err) {
            next(err);
        }
    },

}