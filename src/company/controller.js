 const { db, QueryTypes, company} = require('../../models')

// Üstekiler sabit kalsın
//Her model kullanımı için  ismi değiştirin (company)
// company_id bazında olacak tabii ki bunların hepsi
const Data = company
const cloneDeep = require('clone-deep');
 


module.exports = {
    //sql ile yapılmış sorgu
    getAllBySql: async (req, res) => {

        try {
            const [data, meta] = await db.query("SELECT * FROM company");
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
        const company_id = req.params.company_id
        const parametre2 = 1
        try {
            const [data, meta] =
                await db.query(
                    "SELECT * FROM company where id = :company_id and 1 = :parametre_adi",
                    {
                        replacements: {
                            company_id,
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
            const mycompany = await Data.findAll()
            console.log()
            res.status(200).json({
                statusCode: 200,
                body: mycompany
            })
        } catch (err) {
            console.log(err)
            res.status(500).json({ error: err })
        }
    },
    getByID: async (req, res) => {
        const id = req.params.company_id
        try {
            const mycompany = await Data.findOne({
                where: { id },
                include:   'addresses' 

            });
            res.status(200).json({
                statusCode: 200,
                body: mycompany
            })
        } catch (err) {
            console.log(err)
            res.status(500).json({ error: err })
        }
    }, 
    create: async (req, res) => {
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
            media,
            addresses
        } = req.body

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
                media

            });
          
            res.status(200).json({
                statusCode: 200,
                body: mycompany
            })
        } catch (err) {
            console.log(err)
            res.status(500).json({ error: err })
        }
    },
    update: async (req, res) => {
        const id = req.params.company_id
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
            media
        } = req.body
        try {
            const mycompany = await Data.findOne({ where: { id } })
            if (tanent_id) mycompany.tanent_id = tanent_id
            if (name) mycompany.name = name
            if (full_name) mycompany.full_name = full_name
            if (logo_link) mycompany.logo_link = logo_link
            if (photos) mycompany.photos = photos
            if (last_login) mycompany.last_login = last_login
            if (registered_date) mycompany.registered_date = registered_date
            if (street) mycompany.street = street
            if (city) mycompany.city = city
            if (state) mycompany.state = state
            if (country) mycompany.country = country
            if (latitude) mycompany.latitude = latitude
            if (longitude) mycompany.longitude = longitude
            if (map_point) mycompany.map_point = map_point
            if (gtm) mycompany.gtm = gtm
            if (phone) mycompany.phone = phone
            if (fax) mycompany.fax = fax
            if (website) mycompany.website = website
            if (additional_url) mycompany.additional_url = additional_url
            if (email) mycompany.email = email
            if (employees) mycompany.employees = employees
            if (founded_in) mycompany.founded_in = founded_in
            if (legal_form) mycompany.legal_form = legal_form
            if (vat_uid) mycompany.vat_uid = vat_uid
            if (dun) mycompany.dun = dun
            if (linkedin) mycompany.linkedin = linkedin
            if (twitter) mycompany.twitter = twitter
            if (youtube) mycompany.youtube = youtube
            if (instagram) mycompany.instagram = instagram
            if (facebook) mycompany.facebook = facebook
            if (industry) mycompany.industry = industry
            if (technology) mycompany.technology = technology
            if (metarial) mycompany.metarial = metarial
            if (process) mycompany.process = proces
            if (types) mycompany.types = types
            if (media) mycompany.media = media

        
            await mycompany.save()

            res.status(200).json({
                statusCode: 200,
                body: mycompany
            })
        } catch (err) {
            console.log(err)
            res.status(500).json({ error: err })
        }

    },
    delete: async (req, res) => {
        const id = req.params.company_id;

        try {
            await Data.destroy({
                where: {
                  id: id
                }
              });

            res.status(200).json({
                statusCode: 200,
            })
        } catch (err) {
            console.log(err)
            res.status(500).json({ error: err })
        }
    },
    changeActiveStatus: async (req, res) => {
        const id = req.params.company_id

        try {
            const mycompany = await Data.findOne({ where: { id } })
            mycompany.is_active = !mymedia.is_active
         
            await mycompany.save()

            res.status(200).json({
                statusCode: 200,
                body: mycompany
            })
        } catch (err) {
            console.log(err)
            res.status(500).json({ error: err })
        }

    },
}