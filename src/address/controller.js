const { db, QueryTypes, address } = require('../../models')

// Üstekiler sabit kalsın
//Her model kullanımı için  ismi değiştirin (address)
// address_id bazında olacak tabii ki bunların hepsi
const Data = address

module.exports = {
 
    getByID: async (req, res) => {
        const address_id = req.params.address_id
        try {
            const myaddress = await Data.findOne({
                where: { id: address_id },
                // include: 'media',
            })
            res.status(200).json({
                statusCode: 200,
                body: myaddress
            })
        } catch (err) {
            console.log(err)
            res.status(500).json({ error: err })
        }
    },
    getByCompanyId: async (req, res) => {
        const company_id = req.params.company_id
        try {
            const myaddress = await Data.findAll({
                where: { company_id: company_id },
             })
            res.status(200).json({
                statusCode: 200,
                body: myaddress
            })
        } catch (err) {
            console.log(err)
            res.status(500).json({ error: err })
        }
    },
    create: async (req, res) => {
        const {
            id, 
            description,
            company_id,
            title,
            type,
            lat,
            lng,
        } = req.body
        console.log(req.body);
 
        try { 
            const myaddress = await Data.create({
                id,
                title,
                description,
                type,
                company_id,
                latitude:lat,
                longitude:lng
            })
            res.status(200).json({
                statusCode: 200,
                body: myaddress
            })
        } catch (err) {
            console.log(err)
            res.status(500).json({ error: err })
        }
    },
    update: async (req, res) => {
        const address_id = req.params.address_id
        const {
            is_active,
            is_deleted,
            description,
            title
        } = req.body
        try {
            const myaddress = await Data.findOne({ where: { address_id } })
            if (is_active) myaddress.is_active = is_active
            if (is_deleted) myaddress.is_deleted = is_deleted
            if (description) myaddress.description = description
            if (title) myaddress.title = title
             

            await myaddress.save()

            res.status(200).json({
                statusCode: 200,
                body: myaddress
            })
        } catch (err) {
            console.log(err)
            res.status(500).json({ error: err })
        }

    },
    delete: async (req, res) => {
        
        const id = req.params.address_id;

        try {
            await Data.destroy({
                where: {
                  id: id
                }
              });

            res.json({
                statusCode: 200,
            })
        } catch (err) {
            res.status(500).json({ error: err })
        }
    },
    changeActiveStatus: async (req, res) => {
        const address_id = req.params.address_id

        try {
            const myaddress = await Data.findOne({ where: { address_id } })
            myaddress.is_active = !myaddress.is_active

            await myaddress.save()

            res.status(200).json({
                statusCode: 200,
                body: myaddress
            })
        } catch (err) {
            console.log(err)
            res.status(500).json({ error: err })
        }

    },
}