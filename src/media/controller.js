const { media } = require("../../models");
const { axios } = require("axios");
const sequelize = require("sequelize");
const { generateGetUrl, generatePutUrl } = require("./s3/AWSPresigner");
// Üstekiler sabit kalsın
//Her model kullanımı için  ismi değiştirin (media)
// media_id bazında olacak tabii ki bunların hepsi
const Data = media;

module.exports = {
  getPutUrl: async (req, res, next) => {
    // Both Key and ContentType are defined in the client side.
    // Key refers to the remote name of the file.
    // ContentType refers to the MIME content type, in this case image/jpeg
    // buraya verilen key ismi neyse s3te de aynısı olacak
    const { Key, ContentType } = req.query;
    generatePutUrl(Key, ContentType)
      .then((putURL) => {
        res.send({ putURL });
      })
      .catch((err) => {
        res.send(err);
      });
  },
  getFileUrl: async (req, res, next) => {
    // Both Key and ContentType are defined in the client side.
    // Key refers to the remote name of the file.
    const key  = req.query.Key;
    generateGetUrl(key)
      .then((getURL) => {
        res.send(getURL);
      })
      .catch((err) => {
        next(err);
      });
  },
  upload: async (req, res, next) => {
    await generatePutUrl(req.query.fileName, "text/plain")
      .then((putURL) => {
        const { file } = req.file;
        const contentType = file.type;

        const options = {
          params: {
            Key: file.name,
            ContentType: contentType,
          },
          headers: {
            "Content-Type": contentType,
          },
        };

        axios
          .put(putURL, file, options)
          .then((res) => {
            //write db
          })
          .catch((err) => {
            console.error(err);
          });
      })
      .catch((err) => {
        next(err);
      });
  },
  // aşağıdakilerin hepsi ORM ile yapılmıştı
  // mümkün oldukça ORM kullanalım
  getAll: async (req, res, next) => {
    try {
      const mymedia = await Data.findAll();
      res.json({
        statusCode: 200,
        body: mymedia,
      });
    } catch (err) {
      next(err);
    }
  },
  getById: async (req, res, next) => {
    const id = req.params.media_id;
    try {
      const mymedia = await Data.findOne({
        where: { id },
        // include: 'media',
      });
      res.json({
        statusCode: 200,
        body: mymedia,
      });
    } catch (err) {
      next(err);
    }
  },
  getMediasByCompanyId: async (req, res, next) => {
    const id = req.params.company_id;
    try {
      const medias = await Data.findOne({
        where: { company_id: id },
      });
      res.json({
        statusCode: 200,
        body: medias,
      });
    } catch (err) {
      next(err);
    }
  },
  getMediasByVehicleId: async (req, res, next) => {
    const id = req.params.vehicle_id;
    try {
      const medias = await Data.findOne({
        where: { vehicle_id: id },
      });
      res.json({
        statusCode: 200,
        body: medias,
      });
    } catch (err) {
      next(err);
    }
  },
  getMediasByProductId: async (req, res, next) => {
    const id = req.params.product_id;
    try {
      const medias = await Data.findOne({
        where: { product_id: id },
      });
      res.json({
        statusCode: 200,
        body: medias,
      });
    } catch (err) {
      next(err);
    }
  },
  create: async (req, res, next) => {
    const {
      company_id,
      user_id,
      title,
      type,
      description,
      video_url,
      ref,
      path,
      ref_id,
      file_path
    } = req.body;

    try {
      const mymedia = await Data.create({
        company_id,
        user_id,
        title,
        type,
        description,
        video_url,
        ref,
        path,
        ref_id,
        file_path
      });
      res.json({
        statusCode: 200,
        body: mymedia,
      });

      

    } catch (err) {
      next(err);
    }
  },
  update: async (req, res, next) => {
    const id = req.params.media_id;
    const { title, type, description, video_url, ref, path, file_path} = req.body;

    try {
      const mymedia = await Data.findOne({ where: { id } });

      if (title) mymedia.title = title;
      if (type) mymedia.type = type;
      if (description) mymedia.description = description;
      if (video_url) mymedia.video_url = video_url;
      if (ref) mymedia.ref = ref;
      if (path) mymedia.path = path;
      if (file_path) mymedia.file_path = file_path;

      await mymedia.save();

      res.json({
        statusCode: 200,
        body: mymedia,
      });
    } catch (err) {
      next(err);
    }
  },
  delete: async (req, res, next) => {
    const id = req.params.media_id;

    try {
      await Data.destroy({
        where: {
          id: id,
        },
      });

      res.json({
        statusCode: 200,
      });
    } catch (err) {
      next(err);
    }
  },
};
