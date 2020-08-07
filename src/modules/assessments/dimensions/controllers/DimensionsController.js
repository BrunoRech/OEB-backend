const DimensionsRepositories = require("../repositories/DimensionsRepositories")
const CreateDimensionService = require("../services/CreateDimensionService")
const DeleteDimensionService = require("../services/DeleteDimensionService")

class DimensionsController {
  async list(req, res) {
    const { formId } = req.params

    const dimension = await DimensionsRepositories.findByFormId(formId)

    return res.json(dimension);
  }

  async show(req, res) {
    const { id } = req.params;

    const dimension = await DimensionsRepositories.findById(id);

    return res.json(dimension);
  }

  async create(req, res) {
    const { formId } = req.params;
    const { titulo, descricao } = req.body;

    const createDimension = new CreateDimensionService()
    const dimension = await createDimension.execute(formId, {
      titulo,
      descricao
    });

    return res.json(dimension);
  }

  async update(req, res) {
    const { id } = req.params;
    const { titulo, descricao } = req.body;

    const dimension = await DimensionsRepositories.findByIdAndUpdate(id, { titulo, descricao });

    return res.json(dimension);
  }

  async delete(req, res) {
    const { id } = req.params;

    const deleteDimension = new DeleteDimensionService()
    await deleteDimension.execute(id)

    return res.status(204).send();
  }
}

module.exports = DimensionsController;
