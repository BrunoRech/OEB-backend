const CreateFileService = require('../services/CreateFileService');
const DeleteFileService = require('../services/DeleteFileService');
const ShowFileService = require('../services/ShowFileService');
const UpdateFileService = require('../services/UpdateFileService');

class FileController {
  async show(req, res) {
    const { id } = req.params

    const showFile = new ShowFileService()
    const downloadStream = await showFile.execute(id);

    downloadStream.on('data', data => {
      res.send(data);
    });
  }

  async create(req, res) {
    const { file: fileData } = req

    const createFile = new CreateFileService()
    const file = await createFile.execute(fileData)

    return res.status(201).json(file);
  }

  async update(req, res) {
    const { id } = req.params
    const { file: fileData } = req

    const updateFile = new UpdateFileService()
    const file = await updateFile.execute(id, fileData)

    return res.json(file);
  }

  async delete(req, res) {
    const { id } = req.params;

    const deleteFile = new DeleteFileService()
    await deleteFile.execute(id)

    return res.send();
  }
}

module.exports = FileController;
