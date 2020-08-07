const crypto = require('crypto');
const GridFsStorage = require('multer-gridfs-storage');
const path = require('path');

module.exports = {
  storage: new GridFsStorage({
    url: process.env.MONGO_URL,
    options: { useNewUrlParser: true },
    file: (req, file) =>
      new Promise((resolve, reject) => {
        crypto.randomBytes(16, (err, buf) => {
          if (err) {
            return reject(err);
          }
          const filename =
            buf.toString('hex') + path.extname(file.originalname);
          const fileInfo = {
            filename,
            bucketName: 'uploads'
          };
          resolve(fileInfo);
        })
      })
  }),
  limits: {
    fileSize: 512000,
  },
  fileFilter: (req, file, cb) => {
    const allowedMimes = ['image/jpeg', 'image/pjpeg', 'image/png'];

    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Arquivo em formato inválido'));
    }
  }
};




