const FilesRepository = require("../repositories/FilesRepository")


class CreateFileService {
  async execute(fileData) {

    if (!fileData) {
      throw Error('Informe um arquivo');
    }

    const { fieldname, originalname, size, filename, id } = fileData;

    const file = await FilesRepository.create({
      name: originalname,
      size,
      key: filename,
      idFile: id,
      field: fieldname
    })

    return file
  }
}

module.exports = CreateFileService
