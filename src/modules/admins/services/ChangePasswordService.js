const bcrypt = require('bcryptjs');

const AdminsRepository = require("../repositories/AdminsRepository")

class ChangePasswordService {

  async execute({ id, senhaAntiga, senha, confirmacaoSenha }) {
    const admin = await AdminsRepository.findById(id)

    if (!admin) {
      throw Error('Administrador não encontrado');
    }

    const passwordMatched = await bcrypt.compare(senhaAntiga, admin.senha);

    if (!passwordMatched) {
      throw Error('Senha inválida');
    }

    if (senha !== confirmacaoSenha) {
      throw Error('Senhas não coincidem');
    }

    admin.senha = senha;

    await AdminsRepository.save(admin)

    return admin
  }
}

module.exports = ChangePasswordService
