const CriteriaRepositories = require("../repositories/CriteriaRepositories")
const CreateCriterionService = require("../services/CreateCriterionService")
const DeleteCriterionService = require("../services/DeleteCriterionService")

class CriteriaController {
  async list(req, res) {
    const { indicatorId } = req.params

    const criteria = await CriteriaRepositories.findByIndicatorId(indicatorId)

    return res.json(criteria);
  }

  async show(req, res) {
    const { id } = req.params;

    const criterion = await CriteriaRepositories.findById(id);

    return res.json(criterion);
  }

  async create(req, res) {
    const { indicatorId } = req.params;
    const { titulo } = req.body;

    const createCriterion = new CreateCriterionService()
    const criterion = await createCriterion.execute(indicatorId, {
      titulo,
    });

    return res.json(criterion);
  }

  async update(req, res) {
    const { id } = req.params;
    const { titulo } = req.body;

    const criterion = await CriteriaRepositories.findByIdAndUpdate(id, { titulo });

    return res.json(criterion);
  }

  async delete(req, res) {
    const { id } = req.params;

    const deleteCriterion = new DeleteCriterionService()
    await deleteCriterion.execute(id)

    return res.status(204).send();
  }
}

module.exports = CriteriaController;
