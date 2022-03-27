const { db } = require('../../models')

module.exports = {
    getAllCompanyProcess: async (req, res, next) => {
        try {
            const companyProcess = " select c.full_name, c.phone  , c.email , ca.status , ca.description, ca.created_at " +
                " from public.company c, public.company_approval ca  " +
                " where ca.company_id = c.id  order by  created_at desc, full_name ";
            const data = await db.query(companyProcess);
            res.json({
                statusCode: 200,
                body: data
            })
        } catch (err) {
            next(err);
        }
    },

}