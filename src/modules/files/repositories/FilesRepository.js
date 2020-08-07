const File = require("../entities/File")

class FilesRepository {

  async findById(id) {
    const file = await File.findById(id)
    return file
  }

  async create(data) {
    const file = await File.create(data)
    return file
  }

  async findByIdAndUpdate(id, data) {
    const file = await File.findByIdAndUpdate(id, data, { new: true })
    return file
  }

  async findByIdAndDelete(id) {
    await File.findByIdAndDelete(id)
  }

  async save(act) {
    await act.save()
  }

}

module.exports = new FilesRepository()
