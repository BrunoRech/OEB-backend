
class VerifyCriteraResponseService {
  execute(formInstitution) {
    formInstitution.dimensoes.forEach(dimension => {
      dimension.indicadores.forEach(indicator => {
        indicator.respostasCriterios.forEach(response => {
          if (response.atende === null) {
            throw Error(
              'Você precisa responder todos os critérios antes de enviar o formulário!'
            );
          }
        })
      });

      formInstitution.requisitosLegais.forEach(requirement => {
        if (requirement.atende === null) {
          throw Error(
            'Você precisa responder todos os requisitos legais antes de enviar o formulário!'
          );
        }
      })

      if (dimension.relatoGlobal === "") {
        throw Error(
          'Você precisa escrever o relato global de cada dimensão'
        );
      }
    });
  }
}

module.exports = VerifyCriteraResponseService
