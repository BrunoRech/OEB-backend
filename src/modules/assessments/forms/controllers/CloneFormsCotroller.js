const CloneFormService = require("../services/CloneFormService")

class FormsController {

  async create(req, res) {
    const { formId } = req.params;
    const { titulo, anoAplicacao, dataLimite } = req.body;

    const cloneForm = new CloneFormService()
    const form = await cloneForm.execute(formId, { titulo, anoAplicacao, dataLimite })

    return res.json(form);
  }

}

module.exports = FormsController;
