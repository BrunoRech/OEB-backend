const CreateActService = require('../services/CreateActService');
const DeleteActService = require('../services/DeleteActService');
const ListActsService = require('../services/ListActsService');
const ShowActService = require('../services/ShowActService');
const UpdateActService = require('../services/UpdateActService');

class ActsController {
  async list(req, res) {
    const { userId: institutionId } = req

    const listActs = new ListActsService()
    const acts = await listActs.execute(institutionId);

    res.json(acts);
  }

  async show(req, res) {
    const { id } = req.params

    const showAct = new ShowActService()
    const act = await showAct.execute(id);

    res.json(act);
  }

  async create(req, res) {
    const { userId: institutionId } = req
    const { body } = req

    const createAct = new CreateActService()
    const act = await createAct.execute(institutionId, body)

    return res.status(201).json(act);
  }

  async update(req, res) {
    const { id } = req.params
    const { body } = req

    const updateAct = new UpdateActService()
    const act = await updateAct.execute(id, body)

    return res.status(201).json(act);
  }

  async delete(req, res) {
    const { id } = req.params

    const deleteAct = new DeleteActService()
    await deleteAct.execute(id)

    return res.status(204).send();
  }
}

module.exports = ActsController;
