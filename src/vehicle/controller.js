const { db, QueryTypes, vehicle } = require('../../models')

const Data = vehicle;

module.exports = {
    //sql ile yapılmış sorgu
    getAllBySql: async (req, res) => {

        try {
            const [data, meta] = await db.query("SELECT * FROM vehicle");
            res.status(200).json({
                statusCode: 200,
                body: data
            })
        } catch (err) {
            console.log(err)
            res.json({ error: err })
        }
    },
    //sql ile yapılmış sorgu
    // örnek olsun diye ikinci parametreyi de ekleyeceğim
    getByIdBySql: async (req, res) => {
        const vehicle_id = req.params.vehicle_id
        const parametre2 = 1
        try {
            const [data, meta] =
                await db.query(
                    "SELECT * FROM vehicle where vehicle_id = :vehicle_id and 1 = :parametre_adi",
                    {
                        replacements: {
                            vehicle_id,
                            parametre_adi: parametre2
                        },
                        type: QueryTypes.SELECT
                    }
                );
            res.status(200).json({
                statusCode: 200,
                body: data
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
            const myvehicle = await Data.findAll()
            console.log()
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
        const vehicle_id = req.params.vehicle_id
        try {
            const myvehicle = await Data.findOne({
                where: { vehicle_id },
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
            vehicle_id,
            company_id,
            vehicle_name,
            vehicle_type,
            is_active,
            is_deleted,
            registered_date
        } = req.body

        console.log(is_active,
            is_deleted,
            vehicle_name,
            full_vehicle_name)

        try {

            const myvehicle = await Data.create({
                vehicle_id,
                company_id,
                vehicle_name,
                vehicle_type,
                is_active,
                is_deleted,
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
        const vehicle_id = req.params.vehicle_id
        const {
            company_id,
            vehicle_name,
            vehicle_type,
            is_active,
            is_deleted,
            registered_date
        } = req.body
        try {
            const myvehicle = await Data.findOne({ where: { vehicle_id } })
            if (is_active) myvehicle.is_active = is_active
            if (is_deleted) myvehicle.is_deleted = is_deleted
            if (vehicle_name) myvehicle.vehicle_name = vehicle_name
            if (vehicle_id) myvehicle.vehicle_id = vehicle_id
            if (company_id) myvehicle.company_id = company_id
            if (vehicle_type) myvehicle.vehicle_type = vehicle_type
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
        const vehicle_id = req.params.vehicle_id

        try {
            const myvehicle = await Data.findOne({ where: { vehicle_id } })
            myvehicle.is_active = false
            myvehicle.is_deleted = true

            await myvehicle.save()

            res.status(200).json({
                statusCode: 200,
                body: myvehicle
            })
        } catch (err) {
            console.log(err)
            res.status(500).json({ error: err })
        }
        next()
    },
    changeActiveStatus: async (req, res) => {
        const vehicle_id = req.params.vehicle_id

        try {
            const myvehicle = await Data.findOne({ where: { vehicle_id } })
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