const IndicatorsRepositories = require("../repositories/IndicatorsRepositories")
const CreateIndicatorService = require("../services/CreateIndicatorService")

class IndicatorsController {
  async list(req, res) {
    const { dimensionId } = req.params;

    const indicators = await IndicatorsRepositories.findByDimensionId(dimensionId)

    return res.json(indicators);
  }

  async show(req, res) {
    const { id } = req.params;

    const indicator = await IndicatorsRepositories.findById(id);

    return res.json(indicator);
  }

  async create(req, res) {
    const { dimensionId } = req.params;
    const { titulo } = req.body;

    const createIndicator = new CreateIndicatorService()

    const indicator = await createIndicator.execute(dimensionId, { titulo });

    return res.json(indicator);
  }

  async update(req, res) {
    const { id } = req.params;
    const { titulo } = req.body;

    const indicator = await IndicatorsRepositories.findByIdAndUpdate(id, { titulo });

    return res.json(indicator);
  }

  async delete(req, res) {
    const { id } = req.params;

    await IndicatorsRepositories.findByIdAndDelete(id);

    return res.status(204).send();
  }
}

module.exports = IndicatorsController;
