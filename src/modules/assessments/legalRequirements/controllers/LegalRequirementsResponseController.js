const CreateLegalRequirementsResponseService = require("../services/CreateLegalRequirementsResponseService")

class LegalRequirementsResponseController {

  async create(req, res) {
    const { userId: institutionId } = req;
    const { formId } = req.params;
    const { requisitos } = req.body;

    const createLegalRequirementsResponse = new CreateLegalRequirementsResponseService()

    const requirements = await createLegalRequirementsResponse.execute(
      institutionId, formId, { requisitos });

    return res.json(requirements);
  }

}

module.exports = LegalRequirementsResponseController;
