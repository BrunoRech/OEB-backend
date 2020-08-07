const ActPole = require("../entities/ActPole")

class ActPolesRepository {

  async findById(id) {
    const actPole = await ActPole.findById(id)
    return actPole
  }

  async findByPoleId(poleId) {
    const actPole = await ActPole.findOne().where({ polo: poleId })
    return actPole
  }

  async findByActId(actId) {
    const actPole = await ActPole.findOne().where({ ato: actId })
    return actPole
  }

  async findByActAndPoleId(actId, poleId) {
    const actPole = await ActPole.findOne().and([{ ato: actId }, { polo: poleId }]);
    return actPole
  }

  async findPolesByActId(actId) {
    const actPoles = await ActPole.find()
      .where({ ato: actId })
      .populate('polo');

    return actPoles
  }

  async create(data) {
    const act = await ActPole.create(data)
    return act
  }

  async findByActIdAndDelete(id) {
    await ActPole.findByIdAndDelete(id);
  }

  async save(actPole) {
    await actPole.save()
  }



}

module.exports = new ActPolesRepository()
