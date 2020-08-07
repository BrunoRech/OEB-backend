const EvaluateFormService = require("../services/EvaluateFormService")

class EvaluateFormController {

  async create(req, res) {
    const { userId: institutionId } = req;
    const { formId } = req.params;
    const { relatoFinal } = req.body

    const evaluateForm = new EvaluateFormService()
    await evaluateForm.execute(institutionId, formId, { relatoFinal })

    return res.json({ relatoFinal });
  }

}

module.exports = EvaluateFormController;
