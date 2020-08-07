const bcrypt = require('bcryptjs');

const InstitutionsRepository = require("../repositories/InstitutionsRepository")

class CreateInstitutionService {
  async execute(data) {
    const { email, cnpj, senha } = data
    const checkInstitutionEmailExists = await InstitutionsRepository.findByEmail(email)

    if (checkInstitutionEmailExists) {
      throw Error('Já existe uma instituição com este e-mail');
    }

    const checkInstitutionCnpjExists = await InstitutionsRepository.findByCnpj(cnpj)

    if (checkInstitutionCnpjExists) {
      throw Error('Já existe uma instituição com este CNPJ');
    }

    const hashedPassword = await bcrypt.hash(senha, 8);

    const institution = await InstitutionsRepository.create(
      { ...data, senha: hashedPassword }
    )

    return institution
  }
}

module.exports = CreateInstitutionService
