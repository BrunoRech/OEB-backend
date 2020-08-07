const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const authConfig = require('../../../config/auth');
const AdminsRepository = require("../repositories/AdminsRepository")


class AuthenticateAdminsService {

  async execute({ cpf, senha }) {
    const admin = await AdminsRepository.findByCpf(cpf)

    if (!admin) {
      throw Error('Administrador não encontrado');
    }

    const passwordMatched = await bcrypt.compare(senha, admin.senha);

    if (!passwordMatched) {
      throw Error('Senha inválida');
    }

    const { secret, expiresIn } = authConfig;
    const { _id: id } = admin

    const token = jwt.sign({ id, isAdmin: true }, secret, {
      expiresIn
    });

    return token
  }
}

module.exports = AuthenticateAdminsService
