const mongoose = require('mongoose');

const Criterion = require("../../criteria/entities/Criterion")
const Dimension = require("../../dimensions/entities/Dimension")
const Indicator = require("../../indicators/entities/Indicator")
const LegalRequirements = require("../../legalRequirements/entities/LegalRequirements")

const FormInstitutionSchema = new mongoose.Schema({
  formulario: {
    type: mongoose.Schema.ObjectId,
    ref: 'Form',
    require: true
  },
  instituicao: {
    type: mongoose.Schema.ObjectId,
    ref: 'Institution',
    required: true
  },
  conceitoGlobal: {
    type: Number,
    default: 0
  },
  relatoFinal: {
    type: String,
    default: ""
  },
  respondido: {
    type: Boolean,
    default: false
  },
  requisitosLegais: [
    {
      atende: {
        type: Number,
      },
      requisitoExistente: {
        type: mongoose.Schema.ObjectId,
        ref: 'LegalRequirements'
      },
    },
  ],
  dimensoes: [
    {
      relatoGlobal: {
        type: String,
        default: ""
      },
      situacao: {
        type: Number,
        default: 0
      },
      conceitoFinal: {
        type: Number,
        default: 0
      },
      criteriosAtendidos: {
        type: Number,
        default: 0
      },
      criteriosAvaliados: {
        type: Number,
        default: 0
      },
      indicadoresAvaliados: {
        type: Number,
        default: 0
      },
      criteriosTotais: {
        type: Number,
        default: 0
      },
      indicadoresTotais: {
        type: Number,
        default: 0
      },
      dimensaoExistente: {
        type: mongoose.Schema.ObjectId,
        ref: 'Dimension'
      },
      indicadores: [
        {
          criteriosAtendidos: {
            type: Number,
            default: 0
          },
          conceito: {
            type: Number,
            default: 0
          },
          indicadorExistente: {
            type: mongoose.Schema.ObjectId,
            ref: 'Indicator'
          },
          respostasCriterios: [
            {
              criterioExistente: {
                type: mongoose.Schema.ObjectId,
                ref: 'Criterion'
              },
              atende: {
                type: Number,
              }
            },
          ]
        }
      ]
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

FormInstitutionSchema.pre('save', async function (next) {
  const form = this
  function isTheFirstSave() {
    return form.dimensoes.length === 0
  }

  function addDimension(dimensionId) {
    form.dimensoes.push({
      dimensaoExistente: dimensionId
    })
  }

  function addRequirement(requirementId) {
    form.requisitosLegais.push({
      requisitoExistente: requirementId,
      atende: null
    })
  }

  function addIndicator(dimensionIndex, indicatorId) {
    form.dimensoes[dimensionIndex].indicadores.push({
      indicadorExistente: indicatorId
    });
  }

  function addCreation(dimensionIndex, indicatorIndex, criterionId) {
    if (form.dimensoes[dimensionIndex].indicadores[indicatorIndex].respostasCriterios !== undefined) {
      form.dimensoes[dimensionIndex].indicadores[indicatorIndex].respostasCriterios.push({
        criterioExistente: criterionId,
        atende: null
      })
    }
  }

  function incrementTotalCriteria(dimensionIndex, numberOfCriteria) {
    form.dimensoes[dimensionIndex].criteriosTotais += numberOfCriteria
  }

  function incrementTotalIndicators(dimensionIndex, numberOfIndicators) {
    form.dimensoes[dimensionIndex].indicadoresTotais += numberOfIndicators
  }

  async function populateFormInsitutionModel() {
    const requirements = await LegalRequirements.find().where({ formulario: form.formulario })
    const dimensions = await Dimension.find().where({ formulario: form.formulario })

    requirements.forEach((requirement) => {
      addRequirement(requirement._id)
    })

    await Promise.all(dimensions.map(async (dimension, dimensionIndex) => {

      addDimension(dimension._id)

      const indicators = await Indicator.find().where({ dimensao: dimension._id })

      incrementTotalIndicators(dimensionIndex, indicators.length)

      await Promise.all(indicators.map(async (indicator, indicatorIndex) => {

        addIndicator(dimensionIndex, indicator._id)

        const criteria = await Criterion.find().where({ indicador: indicator._id })

        incrementTotalCriteria(dimensionIndex, criteria.length)

        criteria.forEach(criterion => {
          addCreation(dimensionIndex, indicatorIndex, criterion._id)
        })

      }));
    }));
  }

  function updateDimensionsSituation() {
    form.dimensoes.forEach((dimension) => {
      dimension.criteriosAvaliados = 0
      dimension.criteriosAtendidos = 0
      dimension.indicadoresAvaliados = 0

      dimension.indicadores.forEach(indicator => {
        const responseEvaluatedCriteria = indicator.respostasCriterios.filter(response => {
          return response.atende !== null
        })

        const responseMetCriteria = indicator.respostasCriterios.filter(response => {
          return response.atende === 1
        })

        if (responseEvaluatedCriteria.length === indicator.respostasCriterios.length) {
          dimension.indicadoresAvaliados += 1
        }

        dimension.criteriosAvaliados += responseEvaluatedCriteria.length
        dimension.criteriosAtendidos += responseMetCriteria.length
      })

      const { criteriosTotais, criteriosAvaliados } = dimension

      if (criteriosAvaliados < criteriosTotais && criteriosAvaliados !== 0) {
        dimension.situacao = 1
      }

      if (criteriosAvaliados === criteriosTotais) {
        dimension.situacao = 2
      }
    })
  }

  if (isTheFirstSave()) {
    await populateFormInsitutionModel()
  } else {
    updateDimensionsSituation()
  }
  return next();
});

module.exports = mongoose.model('FormInstitution', FormInstitutionSchema);
