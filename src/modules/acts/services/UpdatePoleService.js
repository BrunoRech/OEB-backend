const PolesRepositories = require("../repositories/PolesRepositories")


class UpdatePoleService {
  async execute(id, data) {
    const pole = await PolesRepositories.findByIdAndUpdate(id, data)
    return pole
  }
}

module.exports = UpdatePoleService
