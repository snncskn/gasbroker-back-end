const { db, QueryTypes, media } = require('../../models')
const { generateGetUrl, generatePutUrl } = require('./s3/AWSPresigner')
// Üstekiler sabit kalsın
//Her model kullanımı için  ismi değiştirin (media) 
// media_id bazında olacak tabii ki bunların hepsi
const Data = media

module.exports = {

    getPutUrl: async (req, res) => {
        // Both Key and ContentType are defined in the client side.
        // Key refers to the remote name of the file.
        // ContentType refers to the MIME content type, in this case image/jpeg
        // buraya verilen key ismi neyse s3te de aynısı olacak
        const { Key, ContentType } = req.query;
        generatePutUrl(Key, ContentType).then(putURL => {
            res.send({ putURL });
        })
            .catch(err => {
                res.send(err);
            });
    },


    getFileUrl: async (req, res) => {
        // Both Key and ContentType are defined in the client side.
        // Key refers to the remote name of the file.
        const { Key } = req.query;
        console.log(Key)
        generateGetUrl(Key)
            .then(getURL => {
                res.send(getURL);
            })
            .catch(err => {
                res.send(err);
            });
    },
    //sql ile yapılmış sorgu
    // power user için
    getAllBySql: async (req, res) => {

        try {
            const [data, meta] = await db.query("SELECT * FROM media");
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
        const id = req.params.media_id
        const parametre2 = 1
        try {
            const [data, meta] =
                await db.query(
                    "SELECT * FROM media where id = :id and 1 = :parametre_adi",
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
            const mymedia = await Data.findAll()
            console.log()
            res.status(200).json({
                statusCode: 200,
                body: mymedia
            })
        } catch (err) {
            console.log(err)
            res.status(500).json({ error: err })
        }
    },
    getByID: async (req, res) => {
        const id = req.params.media_id
        try {
            const mymedia = await Data.findOne({
                where: { id },
                // include: 'media',
            })
            res.status(200).json({
                statusCode: 200,
                body: mymedia
            })
        } catch (err) {
            console.log(err)
            res.status(500).json({ error: err })
        }
    },
    create: async (req, res) => {
        const {
            company_id,
            user_id,
            title,
            type,
            description,
            video_url,
            ref,
            file,
            ref_id
        } = req.body

        try {

            const mymedia = await Data.create({
                company_id,
                user_id,
                title,
                type,
                description,
                video_url,
                ref,
                file,
                ref_id
            })
            res.status(200).json({
                statusCode: 200,
                body: mymedia
            })
        } catch (err) {
            console.log(err)
            res.status(500).json({ error: err })
        }
    },
    update: async (req, res) => {
        const id = req.params.media_id
        const {
            title,
            type,
            description,
            video_url,
            ref,
            file
        } = req.body
        try {
            const mymedia = await Data.findOne({ where: { id } })
            if (title) mymedia.title = title
            if (type) mymedia.type = type
            if (description) mymedia.description = description
            if (video_url) mymedia.video_url = video_url
            if (ref) mymedia.ref = ref
            if (file) mymedia.file = file
            await mymedia.save()

            res.status(200).json({
                statusCode: 200,
                body: mymedia
            })
        } catch (err) {
            console.log(err)
            res.status(500).json({ error: err })
        }

    },
    delete: async (req, res) => {
        const id = req.params.media_id

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
        next()
    },
    changeActiveStatus: async (req, res) => {
        const id = req.params.media_id

        try {
            const mymedia = await Data.findOne({ where: { id } })
            mymedia.is_active = !mymedia.is_active

            await mymedia.save()

            res.status(200).json({
                statusCode: 200,
                body: mymedia
            })
        } catch (err) {
            console.log(err)
            res.status(500).json({ error: err })
        }

    },
}