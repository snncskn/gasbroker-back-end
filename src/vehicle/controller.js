const { vehicle, company } = require('../../models')

const Data = vehicle;
const Company = company;

module.exports = {
    //sql ile yapılmış sorgu
    getAllBySql: async (req, res) => {

        try {
            const myvehicle = await Data.findAll({include: "company"});
            res.status(200).json({
                statusCode: 200,
                body: myvehicle
            })
        } catch (err) {
            console.log(err)
            res.json({ error: err })
        }
    },
    //sql ile yapılmış sorgu
    // örnek olsun diye ikinci parametreyi de ekleyeceğim
    getByIdBySql: async (req, res) => {
        const id = req.params.vehicle_id
        const parametre2 = 1
        try {
            const myvehicle = await Data.findAll({include: Company});

            res.status(200).json({
                statusCode: 200,
                body: myvehicle
            })
        } catch (err) {
            console.log(err)
            res.json({ error: err })
        }
    },
    check: async (req, res, next) => {
        res.status(200).json({
            statusCode: 200,
            body: JSON.stringify(
                {
                    message: "Welcome to gasbroker api"
                },
                null,
                2
            )
        })
        next()
    },
    // aşağıdakilerin hepsi ORM ile yapılmıştı
    // mümkün oldukça ORM kullanalım
    getAll: async (req, res) => {
        try {
            const myvehicle = await Data.findAll({
                include: "company",
            })
       
            res.status(200).json({
                statusCode: 200,
                body: myvehicle
            })
        } catch (err) {
            console.log(err)
            res.status(500).json({ error: err })
        }
    },
    getByID: async (req, res) => {
        const id = req.params.vehicle_id
        try {
            const myvehicle = await Data.findOne({
                where: { id },
                // include: 'media',
            })
            res.status(200).json({
                statusCode: 200,
                body: myvehicle
            })
        } catch (err) {
            console.log(err)
            res.status(500).json({ error: err })
        }
    },
    create: async (req, res) => {
        const {
            company_id,
            name,
            type,
            registered_date
        } = req.body

         try {

            const myvehicle = await Data.create({
                company_id,
                name,
                type,
                registered_date

            })
            res.status(200).json({
                statusCode: 200,
                body: myvehicle
            })
        } catch (err) {
            console.log(err)
            res.status(500).json({ error: err })
        }
    },
    update: async (req, res) => {
        const id = req.params.vehicle_id
        const {
            company_id,
            name,
            type,
            registered_date
        } = req.body
        try {
            const myvehicle = await Data.findOne({ where: { id } })
            if (name) myvehicle.name = name
            if (id) myvehicle.id = id
            if (company_id) myvehicle.company_id = company_id
            if (type) myvehicle.type = type
            if (registered_date) myvehicle.registered_date = registered_date

            await myvehicle.save()

            res.status(200).json({
                statusCode: 200,
                body: myvehicle
            })
        } catch (err) {
            console.log(err)
            res.status(500).json({ error: err })
        }

    },
    delete: async (req, res) => {
        const id = req.params.vehicle_id

        try {
            await Data.destroy({
                where: {
                  id: id
                }
              });

            res.status(200).json({
                statusCode: 200,
                body: Data
            })
        } catch (err) {
            console.log(err)
            res.status(500).json({ error: err })
        }
    },
    changeActiveStatus: async (req, res) => {
        const id = req.params.vehicle_id

        try {
            const myvehicle = await Data.findOne({ where: { id } })
            myvehicle.is_active = !myvehicle.is_active

            await myvehicle.save()

            res.status(200).json({
                statusCode: 200,
                body: myvehicle
            })
        } catch (err) {
            console.log(err)
            res.status(500).json({ error: err })
        }

    },
}