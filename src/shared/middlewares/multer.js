const crypto = require('crypto');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const path = require('path');

const MONGO_URL = process.env.DB_URL;

const storage = new GridFsStorage({
  url: MONGO_URL,
  options: { useNewUrlParser: true },
  file: (req, file) =>
    new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString('hex') + path.extname(file.originalname);
        const fileInfo = {
          filename,
          bucketName: 'uploads'
        };
        resolve(fileInfo);
      });
    })
});

const multerConfig = multer({
  storage,
  limits: {
    fileSize: 512000
  },
  onError(err, next) {
    next(err);
  }
});

module.exports = multerConfig;
