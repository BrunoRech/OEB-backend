const InstitutionActFilter = require('../../../shared/utils/InstitutionActFilter');
const ActsRepository = require("../repositories/ActsRepository")

class ListActsWithPaginationService {

  async execute({ endereco, municipio, nome, curso, actFilter }, pageOptions) {
    const acts = await ActsRepository.findAllWithPagination(pageOptions)
    const { docs } = acts;
    const formattedData = [];

    docs
      .filter(act => {
        return act.preparadoParaAvaliacao;
      })
      .forEach(act => {
        if (
          InstitutionActFilter.validateAddress(act.instituicao, endereco) &&
          InstitutionActFilter.validateCity(act.instituicao, municipio) &&
          InstitutionActFilter.validateName(act.instituicao, nome) &&
          InstitutionActFilter.validateCourse(act, curso) &&
          InstitutionActFilter.filterBySelection(act, actFilter)
        ) {
          formattedData.push(act);
        }
      });

    acts.docs = formattedData;
    return acts
  }
}

module.exports = ListActsWithPaginationService
