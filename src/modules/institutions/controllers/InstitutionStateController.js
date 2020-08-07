const ChangeInstitutionStateService = require('../services/ChangeInstitutionStateService');

class InstitutionStateController {

  async update(req, res) {
    const { institutionId } = req.params;
    const { ativa } = req.body;

    const changeInstitutionState = new ChangeInstitutionStateService()
    await changeInstitutionState.execute({ institutionId, ativa })

    return res.json(true)
  }

}

module.exports = InstitutionStateController;
