const { Seeder } = require('mongoose-data-seed');

const DescriptionCriterion = require('../../modules/assessments/criterionDescriptors/entities/CriterionDescriptor');
const Indicator = require('../../modules/assessments/indicators/entities/Indicator');

class DescriptionCriterionSeeder extends Seeder {
  async beforeRun() {
    this.indicators = await Indicator.find({}).exec();
    this.descriptionCriteriaData = this.generateDescriptions();
  }

  async shouldRun() {
    return DescriptionCriterion.countDocuments()
      .exec()
      .then(count => count === 0);
  }

  async run() {
    return DescriptionCriterion.create(this.descriptionCriteriaData);
  }

  generateDescriptions() {
    const { indicators } = this;
    const description = [
      {
        conceito: 0,
        descricao: 'Quando não apresenta o (PPP)',
        valorMinimo: 0,
        valorMaximo: 0,
        indicador: indicators[0]._id
      },
      {
        conceito: 1,
        descricao: 'Atende até 5 indicadores',
        valorMinimo: 1,
        valorMaximo: 5,
        indicador: indicators[0]._id
      },
      {
        conceito: 2,
        descricao: 'Atende de 6 a 7 indicadores',
        valorMinimo: 6,
        valorMaximo: 7,
        indicador: indicators[0]._id
      },
      {
        conceito: 3,
        descricao: 'Atende de 8 a 10 indicadores',
        valorMinimo: 8,
        valorMaximo: 10,
        indicador: indicators[0]._id
      },
      {
        conceito: 4,
        descricao: 'Atende de 11 a 12 indicadores',
        valorMinimo: 11,
        valorMaximo: 12,
        indicador: indicators[0]._id
      },
      {
        conceito: 0,
        descricao: 'Quando não possui Regimento Escolar',
        valorMinimo: 0,
        valorMaximo: 0,
        indicador: indicators[1]._id
      },
      {
        conceito: 1,
        descricao: 'Atende até 5 indicadores',
        valorMinimo: 1,
        valorMaximo: 5,
        indicador: indicators[1]._id
      },
      {
        conceito: 2,
        descricao: 'Atende de 6 a 7 indicadores',
        valorMinimo: 6,
        valorMaximo: 7,
        indicador: indicators[1]._id
      },
      {
        conceito: 3,
        descricao: 'Atende de 8 a 10 indicadores',
        valorMinimo: 8,
        valorMaximo: 10,
        indicador: indicators[1]._id
      },
      {
        conceito: 4,
        descricao: 'Atende de 11 a 12 indicadores',
        valorMinimo: 11,
        valorMaximo: 12,
        indicador: indicators[1]._id
      },
      {
        conceito: 0,
        descricao: 'Quando não atende nenhum item',
        valorMinimo: 0,
        valorMaximo: 0,
        indicador: indicators[2]._id
      },
      {
        conceito: 1,
        descricao: 'Quando atende até 7 indicador.',
        valorMinimo: 1,
        valorMaximo: 7,
        indicador: indicators[2]._id
      },
      {
        conceito: 2,
        descricao: 'Quando atende de 8 a 11 indicadores.',
        valorMinimo: 8,
        valorMaximo: 11,
        indicador: indicators[2]._id
      },
      {
        conceito: 3,
        descricao: 'Atende de 12 a 14 indicadores',
        valorMinimo: 12,
        valorMaximo: 14,
        indicador: indicators[2]._id
      },
      {
        conceito: 4,
        descricao: 'Atende de 15 a 16 indicadores',
        valorMinimo: 15,
        valorMaximo: 16,
        indicador: indicators[2]._id
      },
      {
        conceito: 0,
        descricao: 'Quando não atende nenhum item',
        valorMinimo: 0,
        valorMaximo: 0,
        indicador: indicators[3]._id
      },
      {
        conceito: 1,
        descricao: 'Atende até 1indicador.',
        valorMinimo: 1,
        valorMaximo: 1,
        indicador: indicators[3]._id
      },
      {
        conceito: 2,
        descricao: 'Atende de 2  a 3 indicadores.',
        valorMinimo: 2,
        valorMaximo: 3,
        indicador: indicators[3]._id
      },
      {
        conceito: 3,
        descricao: 'Atende de 4 a 5 indicadores.',
        valorMinimo: 4,
        valorMaximo: 5,
        indicador: indicators[3]._id
      },
      {
        conceito: 4,
        descricao: 'Atende todos os indicadores',
        valorMinimo: 6,
        valorMaximo: 6,
        indicador: indicators[3]._id
      }
    ];

    return description;
  }
}

module.exports = DescriptionCriterionSeeder;
