const CriterionDescriptorsRepositores = require("../../criterionDescriptors/repositories/CriterionDescriptorsRepositores")

class DefineIndicatorConceptAndNumberOfCriteriaService {
  async execute(formInstitution) {
    const dimensions = formInstitution.dimensoes.map(
      async (dimension, dimensionIndex) => {
        const indicators = dimension.indicadores.map(
          async (indicator, indicatorIndex) => {
            let countOfCriteria = 0;
            indicator.respostasCriterios.forEach(criterion => {
              if (criterion.atende === 1) countOfCriteria += 1;
            });

            formInstitution.dimensoes[dimensionIndex].indicadores[
              indicatorIndex
            ].criteriosAtendidos = Number(countOfCriteria);

            const descriptionCriteria = await CriterionDescriptorsRepositores.findByIndicatorId(indicator.indicadorExistente)
            let concept = '0';

            descriptionCriteria.forEach(description => {
              const numberOfCriteria = Number(countOfCriteria);
              if (
                numberOfCriteria >= description.valorMinimo &&
                numberOfCriteria <= description.valorMaximo
              ) {
                concept = description.conceito;
              }
            });

            formInstitution.dimensoes[dimensionIndex].indicadores[
              indicatorIndex
            ].conceito = concept;
          }
        );
        await Promise.all(indicators);
      }
    );

    await Promise.all(dimensions);

    return formInstitution;

  }
}

module.exports = DefineIndicatorConceptAndNumberOfCriteriaService
