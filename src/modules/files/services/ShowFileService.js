const { ObjectID } = require('mongodb');
const mongodb = require('mongodb');
const mongoose = require('mongoose');

const FilesRepository = require("../repositories/FilesRepository")

class ShowFileService {

  async execute(id) {
    const conn = mongoose.connection;
    const GridFSBucket = new mongodb.GridFSBucket(conn.db, {
      bucketName: 'uploads'
    });

    const file = await FilesRepository.findById(id)

    if (!file) {
      throw Error('Arquivo não encontrado');
    }

    const imageId = new ObjectID(file.idFile);

    const downloadStream = GridFSBucket.openDownloadStream(imageId);

    return downloadStream
  }
}

module.exports = ShowFileService
