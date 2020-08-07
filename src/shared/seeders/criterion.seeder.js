const { Seeder } = require('mongoose-data-seed');

const Criterion = require('../../modules/assessments/criteria/entities/Criterion');
const Indicator = require('../../modules/assessments/indicators/entities/Indicator');

class CriterionSeeder extends Seeder {
  async beforeRun() {
    this.indicators = await Indicator.find({}).exec();
    this.criteriaData = this.generateCriteria();
  }

  async shouldRun() {
    return Criterion.countDocuments()
      .exec()
      .then(count => count === 0);
  }

  async run() {
    return Criterion.create(this.criteriaData);
  }

  generateCriteria() {
    const { indicators } = this;
    const criteria = [
      {
        titulo:
          'Foi elaborado e é reelaborado anualmente de forma colegiada pela comunidade educacional e acompanhado pela mesma',
        indicador: indicators[0]._id
      },
      {
        titulo: 'Contempla e respeita a diversidade e pluralidade cultural',
        indicador: indicators[0]._id
      },
      {
        titulo: 'Foi discutido, elaborado e aprovado pela comunidade escolar',
        indicador: indicators[1]._id
      },
      {
        titulo:
          'É de conhecimento de toda a comunidade escolar interna e externa',
        indicador: indicators[1]._id
      },
      {
        titulo: 'Dá autonomia para a equipe exercer suas funções',
        indicador: indicators[2]._id
      },
      {
        titulo: 'Descentraliza funções',
        indicador: indicators[2]._id
      },
      {
        titulo: 'Elabora o planejamento anual coletivamente',
        indicador: indicators[3]._id
      },
      {
        titulo: 'Define metas, ações e responsáveis',
        indicador: indicators[3]._id
      }
    ];

    return criteria;
  }
}

module.exports = CriterionSeeder;
