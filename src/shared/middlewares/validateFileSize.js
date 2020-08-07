const multer = require('multer');

const multerConfig = require('../../config/multer');

const upload = multer(multerConfig).single("file");

module.exports = async (req, res, next) => {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      if (err.code === "LIMIT_FILE_SIZE") {
        throw new Error("Informe um arquivo de no máximo 500kb")
      }
    } else if (err) {
      throw new Error("Erro ao realizar upload do arquivo")
    }
    next()
  })
}
