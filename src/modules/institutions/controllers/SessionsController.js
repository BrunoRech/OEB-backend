const AuthenticateInstitutionsService = require('../services/AuthenticateInstitutionsService');

class SessionsController {

  async create(req, res) {
    const { cnpj, senha } = req.body

    const authenticateInstitution = new AuthenticateInstitutionsService()
    const token = await authenticateInstitution.execute({ cnpj, senha })

    return res.json({ token })
  }

}

module.exports = SessionsController;
