const { Seeder } = require('mongoose-data-seed');

const Dimension = require('../../modules/assessments/dimensions/entities/Dimension');
const Indicator = require('../../modules/assessments/indicators/entities/Indicator');

class IndicatorSeeder extends Seeder {
  async beforeRun() {
    this.dimensions = await Dimension.find({}).exec();
    this.indicatorsData = this.generateIndicators();
  }

  async shouldRun() {
    return Indicator.countDocuments()
      .exec()
      .then(count => count === 0);
  }

  async run() {
    return Indicator.create(this.indicatorsData);
  }

  generateIndicators() {
    const { dimensions } = this;
    const indicators = [
      {
        titulo: 'Projeto Político Pedagógico (PPP)',
        dimensao: dimensions[0]._id
      },
      {
        titulo: 'Regimento Escolar',
        dimensao: dimensions[0]._id
      },
      {
        titulo: 'Gestão Escolar',
        dimensao: dimensions[1]._id
      },
      {
        titulo:
          'Gestão na elaboração e acompanhamento do Planejamento Anual (estratégico)',
        dimensao: dimensions[1]._id
      }
    ];

    return indicators;
  }
}

module.exports = IndicatorSeeder;
