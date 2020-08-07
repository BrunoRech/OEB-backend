const bcrypt = require('bcryptjs');

const InstitutionsRepository = require("../repositories/InstitutionsRepository")

class ChangePasswordService {

  async execute({ id, senhaAntiga, senha, confirmacaoSenha }) {
    const institution = await InstitutionsRepository.findById(id)

    if (!institution) {
      throw Error('Instituição não encontrada');
    }

    const passwordMatched = await bcrypt.compare(senhaAntiga, institution.senha);

    if (!passwordMatched) {
      throw Error('Senha inválida');
    }

    if (senha !== confirmacaoSenha) {
      throw Error('Senhas não coincidem');
    }

    institution.senha = senha;

    await InstitutionsRepository.save(institution)

    return institution
  }
}

module.exports = ChangePasswordService
