const bcrypt = require('bcryptjs');

const AdminsRepository = require("../repositories/AdminsRepository")

class CreateAdminService {
  async execute(data) {
    const { email, cpf, senha } = data
    const checkAdminEmailExists = await AdminsRepository.findByEmail(email)

    if (checkAdminEmailExists) {
      throw Error('Já existe uma Administrador com este e-mail');
    }

    const checkInstitutionCpfExists = await AdminsRepository.findByCpf(cpf)

    if (checkInstitutionCpfExists) {
      throw Error('Já existe uma instituição com este CPF');
    }

    const hashedPassword = await bcrypt.hash(senha, 8);

    const admin = await AdminsRepository.create(
      { ...data, senha: hashedPassword }
    )

    return admin
  }
}

module.exports = CreateAdminService
