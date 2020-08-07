const FilesRepository = require("../repositories/FilesRepository")


class UpdateFileService {
  async execute(id, fileData) {

    if (!fileData) {
      throw Error('Informe um arquivo');
    }

    const { fieldname, originalname, size, filename, id: fileId } = fileData;

    const file = await FilesRepository.findByIdAndUpdate(id, {
      name: originalname,
      size,
      key: filename,
      idFile: fileId,
      field: fieldname
    })

    if (!file) {
      throw Error('Arquivo não encontrado');
    }

    return file
  }
}

module.exports = UpdateFileService
