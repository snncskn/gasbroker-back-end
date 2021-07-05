const { type } = require('../../models')

const Data = type; 

module.exports = {

    getAll: async (req, res) => {
        try {
            const myvehicle = await Data.findAll({
               
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
                include: "type",
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
            name,
        } = req.body

         try {

            const myvehicle = await Data.create({
                name, 

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
          name
        } = req.body
        try {
            const entity = await Data.findOne({ where: { id } })
            if (name) entity.name = name
            if (id) entity.id = id

            await entity.save()

            res.status(200).json({
                statusCode: 200,
                body: entity
            })
        } catch (err) {
            console.log(err)
            res.status(500).json({ error: err })
        }

    },
    delete: async (req, res) => {
        const id = req.params.type_id

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
}