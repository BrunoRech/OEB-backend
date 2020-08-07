const AuthenticateAdminsService = require('../services/AuthenticateAdminsService');

class SessionsController {

  async create(req, res) {
    const { cpf, senha } = req.body

    const authenticateAdmin = new AuthenticateAdminsService()
    const token = await authenticateAdmin.execute({ cpf, senha })

    return res.json({ token })
  }

}

module.exports = SessionsController;
