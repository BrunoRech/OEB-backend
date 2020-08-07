const CreateAssessmentResponseService = require("../services/CreateAssessmentResponseService")
const ListAssessmentResponseService = require("../services/ListAssessmentResponseService")
const ShowAssessmentResponseService = require("../services/ShowAssessmentResponseService")

class AssessmentResponseController {
  async list(req, res) {
    const { userId: institutionId } = req;

    const listAssessmentResponse = new ListAssessmentResponseService()
    const formInstitution = await listAssessmentResponse.execute(institutionId)

    return res.json(formInstitution);
  }

  async show(req, res) {
    const { userId: institutionId } = req;
    const { formId } = req.params;
    const { indicator } = req.query

    const showAssessmentResponse = new ShowAssessmentResponseService()
    const formInstitution = await showAssessmentResponse.execute(institutionId, formId, { indicator })

    return res.json(formInstitution);
  }

  async create(req, res) {
    const { userId: institutionId } = req;
    const { indicatorId } = req.params;
    const { criterios } = req.body;


    const createAssessmentResponse = new CreateAssessmentResponseService()
    const formInstitution = await createAssessmentResponse.execute(
      institutionId,
      indicatorId,
      { criterios }
    )

    return res.status(201).json(formInstitution);
  }
}

module.exports = AssessmentResponseController;
