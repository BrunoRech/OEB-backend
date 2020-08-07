const ChangeFormStateService = require("../services/ChangeFormStateService")

class FormsController {

  async update(req, res) {
    const { formId } = req.params;
    const { situacao } = req.body;

    const changeFormState = new ChangeFormStateService()
    const form = await changeFormState.execute(formId, { situacao })

    return res.json(form);
  }

}

module.exports = FormsController;
