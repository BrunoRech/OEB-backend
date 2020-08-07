const FormsRepositories = require("../repositories/FormsRepositories")

class InstitutionsAssessmentController {

  async list(req, res) {
    const forms = await FormsRepositories.findAllWithSituationTwo()
    return res.json(forms);
  }

}

module.exports = InstitutionsAssessmentController;
