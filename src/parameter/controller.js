const { db, QueryTypes, parameter } = require('../../models')

// Üstekiler sabit kalsın
//Her model kullanımı için  ismi değiştirin (parameter)
// parameter_id bazında olacak tabii ki bunların hepsi
const Data = parameter

module.exports = {
    //sql ile yapılmış sorgu
    // power user için
    getAllBySql: async (req, res) => {

        try {
            const [data, meta] = await db.query("SELECT * FROM parameter");
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
        const id = req.params.parameter_id
        const parametre2 = 1
        try {
            const [data, meta] =
                await db.query(
                    "SELECT * FROM parameter where id = :id and 1 = :parametre_adi",
                    {
                        replacements: {
                            id,
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
            const myparameter = await Data.findAll()
            console.log()
            res.status(200).json({
                statusCode: 200,
                body: myparameter
            })
        } catch (err) {
            console.log(err)
            res.status(500).json({ error: err })
        }
    },
    getByID: async (req, res) => {
        const id = req.params.parameter_id
        try {
            const myparameter = await Data.findOne({
                where: { id },
                // include: 'parameter',
            })
            res.status(200).json({
                statusCode: 200,
                body: myparameter
            })
        } catch (err) {
            console.log(err)
            res.status(500).json({ error: err })
        }
    },
    create: async (req, res) => {
        const {
            name,
            category,
            description,
            lang_id,
            char_value,
            int_value,
            float_value,
            bool_value,
            json_value
        } = req.body

        try {

            const myparameter = await Data.create({
                name,
                category,
                description,
                lang_id,
                char_value,
                int_value,
                float_value,
                bool_value,
                json_value
            })
            res.status(200).json({
                statusCode: 200,
                body: myparameter
            })
        } catch (err) {
            console.log(err)
            res.status(500).json({ error: err })
        }
    },
    update: async (req, res) => {
        const id = req.params.parameter_id
        const {
            name,
            category,
            description,
            lang_id,
            char_value,
            int_value,
            float_value,
            bool_value,
            json_value
        } = req.body
        try {
            const myparameter = await Data.findOne({ where: { id } })
            if (name) myparameter.name = name
            if (category) myparameter.category = category
            if (description) myparameter.description = description
            if (lang_id) myparameter.lang_id = lang_id
            if (char_value) myparameter.char_value = char_value
            if (int_value) myparameter.int_value = int_value
            if (float_value) myparameter.float_value = float_value
            if (bool_value) myparameter.bool_value = bool_value
            if (json_value) myparameter.json_value = json_value
            await myparameter.save()

            res.status(200).json({
                statusCode: 200,
                body: myparameter
            })
        } catch (err) {
            console.log(err)
            res.status(500).json({ error: err })
        }

    },
    delete: async (req, res) => {
        const id = req.params.id

        try {
            
            await Data.destroy({
                where: {
                  id: id
                }
            });

            res.status(200).json({
                statusCode: 200,
                body: myparameter
            })
        } catch (err) {
            console.log(err)
            res.status(500).json({ error: err })
        }
    },
    changeActiveStatus: async (req, res) => {
        const id = req.params.parameter_id

        try {
            const myparameter = await Data.findOne({ where: { id } })
            myparameter.is_active = !myparameter.is_active

            await myparameter.save()

            res.status(200).json({
                statusCode: 200,
                body: myparameter
            })
        } catch (err) {
            console.log(err)
            res.status(500).json({ error: err })
        }

    },
}