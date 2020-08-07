const CreatePoleService = require('../services/CreatePoleService');
const ListPolesService = require('../services/ListPolesService');
const RemovePoleService = require('../services/RemovePoleService');
const ShowPoleService = require('../services/ShowPoleService');
const UpdatePoleService = require('../services/UpdatePoleService');

class PolesController {
  async list(req, res) {
    const { userId: institutionId } = req

    const listPoles = new ListPolesService()
    const poles = await listPoles.execute(institutionId);

    res.json(poles);
  }

  async show(req, res) {
    const { id } = req.params

    const showPole = new ShowPoleService()
    const pole = await showPole.execute(id);

    res.json(pole);
  }

  async create(req, res) {
    const { userId: institutionId } = req
    const { body } = req

    const createPole = new CreatePoleService()
    const pole = await createPole.execute(institutionId, body)

    return res.status(201).json(pole);
  }

  async update(req, res) {
    const { id } = req.params
    const { body } = req

    const updatePole = new UpdatePoleService()
    const pole = await updatePole.execute(id, body)

    return res.status(201).json(pole);
  }

  async delete(req, res) {
    const { id } = req.params

    const removePole = new RemovePoleService()
    await removePole.execute(id)

    return res.status(204).send();
  }
}

module.exports = PolesController;
