const { Seeder } = require('mongoose-data-seed');

const Form = require('../../modules/assessments/forms/entities/Form');

const data = [
  {
    titulo: 'Formulário 2020',
    anoAplicacao: '2020',
    dataLimite: Date.now()
  }
];

class FormSeeder extends Seeder {
  async shouldRun() {
    return Form.countDocuments()
      .exec()
      .then(count => count === 0);
  }

  async run() {
    return Form.create(data);
  }
}

module.exports = FormSeeder;
