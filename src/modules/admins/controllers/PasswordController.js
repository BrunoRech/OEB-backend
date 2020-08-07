const ChangePasswordService = require('../services/ChangePasswordService');

class PasswordController {

  async update(req, res) {
    const { userId: id } = req
    const { senhaAntiga, senha, confirmacaoSenha } = req.body

    const changePassword = new ChangePasswordService()
    await changePassword.execute({ id, senhaAntiga, senha, confirmacaoSenha })

    return res.json(true)
  }

}

module.exports = PasswordController;
