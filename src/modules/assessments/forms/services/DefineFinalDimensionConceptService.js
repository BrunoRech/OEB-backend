class DefineFinalDimensionConceptService {
  execute(formInstitution) {
    formInstitution.dimensoes.forEach((dimension, dimensionIndex) => {
      let conceptsSum = 0;
      const numberOfIndicator = dimension.indicadores.length;
      dimension.indicadores.forEach(indicator => {
        conceptsSum += Number(indicator.conceito);
      });

      formInstitution.dimensoes[dimensionIndex].conceitoFinal = Number(
        Math.round(conceptsSum / numberOfIndicator)
      );
    });

    return formInstitution;
  }
}

module.exports = DefineFinalDimensionConceptService
