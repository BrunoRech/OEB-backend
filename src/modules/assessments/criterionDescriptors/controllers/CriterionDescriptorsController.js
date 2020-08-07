const CriterionDescriptorsRepositores = require("../repositories/CriterionDescriptorsRepositores")
const CreateCriterionDescriptorsService = require("../services/CreateCriterionDescriptorsService")
const DeleteCriterionDescriptorsService = require("../services/DeleteCriterionDescriptorsService")

class CriterionDescriptorsController {
  async list(req, res) {
    const { indicatorId } = req.params

    const descriptor = await CriterionDescriptorsRepositores.findByIndicatorId(indicatorId)

    return res.json(descriptor);
  }

  async show(req, res) {
    const { id } = req.params;

    const descriptor = await CriterionDescriptorsRepositores.findById(id);

    return res.json(descriptor);
  }

  async create(req, res) {
    const { indicatorId } = req.params;
    const { conceito, descricao, valorMinimo, valorMaximo } = req.body;

    const createDescriptor = new CreateCriterionDescriptorsService()
    const descriptor = await createDescriptor.execute(indicatorId, {
      conceito,
      descricao,
      valorMinimo,
      valorMaximo,
    });

    return res.json(descriptor);
  }

  async update(req, res) {
    const { id } = req.params;
    const { conceito, descricao, valorMinimo, valorMaximo } = req.body;

    const descriptor = await CriterionDescriptorsRepositores.findByIdAndUpdate(id, {
      conceito, descricao, valorMinimo, valorMaximo
    });

    return res.json(descriptor);
  }

  async delete(req, res) {
    const { id } = req.params;

    const deleteDescriptor = new DeleteCriterionDescriptorsService()
    await deleteDescriptor.execute(id)

    return res.status(204).send();
  }
}

module.exports = CriterionDescriptorsController;
