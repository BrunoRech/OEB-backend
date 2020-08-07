const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const authConfig = require('../../../config/auth');
const InstitutionsRepository = require("../repositories/InstitutionsRepository")


class AuthenticateInstitutionsService {

  async execute({ cnpj, senha }) {
    const institution = await InstitutionsRepository.findByCnpj(cnpj)

    if (!institution) {
      throw Error('Instituição não encontrada');
    }

    const passwordMatched = await bcrypt.compare(senha, institution.senha);

    if (!passwordMatched) {
      throw Error('Senha inválida');
    }

    const { secret, expiresIn } = authConfig;
    const { _id: id } = institution

    const token = jwt.sign({ id, isAdmin: false }, secret, {
      expiresIn
    });

    return token
  }
}

module.exports = AuthenticateInstitutionsService
