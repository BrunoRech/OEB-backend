const { Seeder } = require('mongoose-data-seed');

const Dimension = require('../../modules/assessments/dimensions/entities/Dimension');
const Form = require('../../modules/assessments/forms/entities/Form');

class DimensionSeeder extends Seeder {
  async beforeRun() {
    this.form = await Form.find({}).exec();
    this.dimensionsData = this.generateDimensions();
  }

  async shouldRun() {
    return Dimension.countDocuments()
      .exec()
      .then(count => count === 0);
  }

  async run() {
    return Dimension.create(this.dimensionsData);
  }

  generateDimensions() {
    const formulario = this.form[0]._id;
    const dimensions = [
      {
        titulo: 'Dimensão 1 - Institucional',
        descricao:
          'Avalia o Projeto Político Pedagógico, PPP, a Associação de Pais e Professores (APP), ou similar, o Regimento Escolar, (RE), a Entidade Estudantil, Grêmio ou similar, o Conselho de Classe, as políticas de acessibilidade e inclusão de deficientes, a relação e participação da comunidade na escola e os projetos escolares, totalizando 8 quesitos',
        formulario
      },
      {
        titulo: 'Dimensão 2 - Gestão',
        descricao:
          'Esta dimensão avalia a gestão escolar, a gestão do planejamento, a gestão na elaboração e acompanhamento do plano de ensino, a gestão do nível de aproveitamento escolar e diminuição da evasão, a reunião pedagógica, a concepção de currículo, a gestão da qualidade do ensino aprendizagem, gestão e incentivo à formação docente e gestão da avaliação institucional, com 9 (nove) quesitos.',
        formulario
      }
    ];

    return dimensions;
  }
}

module.exports = DimensionSeeder;
