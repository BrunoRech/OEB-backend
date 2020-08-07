const LegalRequirementsRepositories = require("../repositories/LegalRequirementsRepositories")

class LegalRequirementsController {
  async list(req, res) {
    const { formId } = req.params;

    const requirements = await LegalRequirementsRepositories.findByFormId(formId)

    return res.json(requirements);
  }

  async show(req, res) {
    const { id } = req.params;

    const requirement = await LegalRequirementsRepositories.findById(id);

    return res.json(requirement);
  }

  async create(req, res) {
    const { formId } = req.params;
    const { titulo } = req.body;

    const requirement = await LegalRequirementsRepositories.create(formId, { titulo });

    return res.json(requirement);
  }

  async update(req, res) {
    const { id } = req.params;
    const { titulo } = req.body;

    const requirement = await LegalRequirementsRepositories.findByIdAndUpdate(id, { titulo });

    return res.json(requirement);
  }

  async delete(req, res) {
    const { id } = req.params;

    await LegalRequirementsRepositories.findByIdAndDelete(id);

    return res.status(204).send();
  }
}

module.exports = LegalRequirementsController;
