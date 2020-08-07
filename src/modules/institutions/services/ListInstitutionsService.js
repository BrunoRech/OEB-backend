const InstitutionsRepository = require("../repositories/InstitutionsRepository")

class ListInstitutionsService {

  async execute({ nomeFantasia, email, endereco, municipio }, pageOptions) {
    const filter = {
      nomeFantasia: {},
      email: {},
      endereco: {},
      'municipio.nome': {}
    };

    if (nomeFantasia) {
      filter.nomeFantasia.$regex = new RegExp(nomeFantasia, 'i');
    } else {
      delete filter.nomeFantasia;
    }

    if (email) {
      filter.email.$regex = new RegExp(email, 'i');
    } else {
      delete filter.email;
    }

    if (endereco) {
      filter.endereco.$regex = new RegExp(endereco, 'i');
    } else {
      delete filter.endereco;
    }
    if (municipio) {
      filter['municipio.nome'].$regex = new RegExp(municipio, 'i');
    } else {
      delete filter['municipio.nome'];
    }

    const institutions = await InstitutionsRepository.findAllWithPagination(
      filter,
      pageOptions
    )

    return institutions
  }
}

module.exports = ListInstitutionsService
