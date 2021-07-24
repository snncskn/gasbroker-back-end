const { media } = require("../../models");

const { axios } = require("axios");

const { generateGetUrl, generatePutUrl } = require("./s3/AWSPresigner");
// Üstekiler sabit kalsın
//Her model kullanımı için  ismi değiştirin (media)
// media_id bazında olacak tabii ki bunların hepsi
const Data = media;

module.exports = {
  getPutUrl: async (req, res) => {
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
  getFileUrl: async (req, res) => {
    // Both Key and ContentType are defined in the client side.
    // Key refers to the remote name of the file.
    const { fileInfo } = req.query;

    generateGetUrl(fileInfo)
      .then((getURL) => {
        console.log(getUrl);
        res.send(getURL);
      })
      .catch((err) => {
        res.status(500).json({ error: err });
      });

  },
  upload: async (req, res) => {
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

        axios.put(putURL, file, options).then((res) => {

               //write db 
          })
          .catch((err) => {
            console.error(err);
          });
      })
      .catch((err) => {
        res.status(500).json({ error: err });
      });
  },
  // aşağıdakilerin hepsi ORM ile yapılmıştı
  // mümkün oldukça ORM kullanalım
  getAll: async (req, res) => {
    try {
      const mymedia = await Data.findAll();
      res.json({
        statusCode: 200,
        body: mymedia,
      });
    } catch (err) {
      res.status(500).json({ error: err });
    }
  },
  getById: async (req, res) => {
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
      res.status(500).json({ error: err });
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
      ref_id,
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
        file,
        ref_id,
      });
      res.json({
        statusCode: 200,
        body: mymedia,
      });
    } catch (err) {
      res.status(500).json({ error: err });
    }
  },
  update: async (req, res) => {
    const id = req.params.media_id;
    const { title, type, description, video_url, ref, file } = req.body;

    try {
      const mymedia = await Data.findOne({ where: { id } });

      if (title) mymedia.title = title;
      if (type) mymedia.type = type;
      if (description) mymedia.description = description;
      if (video_url) mymedia.video_url = video_url;
      if (ref) mymedia.ref = ref;
      if (file) mymedia.file = file;

      await mymedia.save();

      res.json({
        statusCode: 200,
        body: mymedia,
      });
    } catch (err) {
      res.status(500).json({ error: err });
    }
  },
  delete: async (req, res) => {
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
      res.status(500).json({ error: err });
    }
    next();
  },
};
