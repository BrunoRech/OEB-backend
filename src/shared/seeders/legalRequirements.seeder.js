const { Seeder } = require('mongoose-data-seed');

const Form = require('../../modules/assessments/forms/entities/Form');
const LegalRequirements = require('../../modules/assessments/legalRequirements/entities/LegalRequirements');

class DimensionSeeder extends Seeder {
  async beforeRun() {
    this.form = await Form.find({}).exec();
    this.dimensionsData = this.generateDimensions();
  }

  async shouldRun() {
    return LegalRequirements.countDocuments()
      .exec()
      .then(count => count === 0);
  }

  async run() {
    return LegalRequirements.create(this.dimensionsData);
  }

  generateDimensions() {
    const formulario = this.form[0]._id;
    const dimensions = [
      {
        titulo: 'Alvará de funcionamento.',
        formulario
      },
      {
        titulo: 'Auto de Vistoria do Corpo de Bombeiros (AVCB).',
        formulario
      },
      {
        titulo: 'Manutenção e Guarda do Acervo Acadêmico, conforme disposto na Portaria N° 1.224, de 18 de dezembro de 2013.',
        formulario
      },
      {
        titulo: 'Condições de acessibilidade para pessoas com deficiência ou mobilidade reduzida, conforme disposto na CF/88, Art. 205, 206 e 208, na NBR 9050/2004, da ABNT, na Lei N° 10.098/2000, nos Decretos N° 5.296/2004, N° 6.949/2009, N° 7.611/2011 e na Portaria N° 3.284/2003.',
        formulario
      },
      {
        titulo: 'Plano de Cargos e Carreira Docente. ',
        formulario
      },
    ];

    return dimensions;
  }
}

module.exports = DimensionSeeder;
