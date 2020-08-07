const SendAssessmentService = require("../services/SendAssessmentService")

class SendAssessmentController {

  async create(req, res) {
    const { userId: institutionId } = req;
    const { formId } = req.params;
    const { relatoFinal } = req.body

    const sendAssessment = new SendAssessmentService()
    await sendAssessment.execute(institutionId, formId, { relatoFinal })

    return res.json({ relatoFinal });
  }

}

module.exports = SendAssessmentController;
