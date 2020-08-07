const CreateActPoleService = require('../services/CreateActPoleService');
const DeleteActPoleService = require('../services/DeleteActPoleService');
const ListActPolesService = require('../services/ListActPolesService');

class ActPolesController {
  async list(req, res) {
    const { actId } = req.params

    const listActPoles = new ListActPolesService()
    const actPoles = await listActPoles.execute(actId);

    res.json(actPoles);
  }

  async create(req, res) {
    const { ato, polo, numeroAto, arquivoAto, validadeAto } = req.body;

    const createActPole = new CreateActPoleService()
    const actPole = await createActPole.execute({
      ato,
      polo,
      numeroAto,
      arquivoAto,
      validadeAto
    })

    return res.status(201).json(actPole);
  }

  async delete(req, res) {
    const { id } = req.params

    const deleteActPole = new DeleteActPoleService()
    await deleteActPole.execute(id)

    return res.status(204).send();
  }
}

module.exports = ActPolesController;
