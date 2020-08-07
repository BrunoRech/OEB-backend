const { Seeder } = require('mongoose-data-seed');

const Institution = require('../../modules/institutions/entities/Institution');

const data = [
  {
    cnpjMantenedora: '56914628000157',
    razaoSocialMantenedora: 'Razao Social Mantenedora',
    cnpj: '09022654000190',
    razaoSocial: 'Udesc',
    nomeFantasia: 'Udesc',
    cep: '89140000',
    endereco: 'Dr. Getúlio Vargas',
    numero: 2822,
    municipio: {
      id: 444,
      nome: 'Ibirama'
    },
    site: 'www.udesc.com.br',
    email: 'udesc@udesc.com',
    senha: '$2a$08$vgnsqb/XPAfcMGSabC9f4.n2smysOlD/wiIKDw5WavUPqIcYparUG',
    telefoneFixo: '47992100081',
    telefoneCelular: '47992100081',
    responsavelDados: 'Responável',
    telefoneResponsavel: '47992100081',
    emailResponsavel: 'responsavel@gmail.com',
    secretario: 'Secretário',
    telefoneSecretario: '47992100081',
    emailSecretario: 'secretario@gmail.com',
    diretor: 'Diretor',
    telefoneDiretor: '47992100081',
    emailDiretor: 'diretor@gmail.com',
    dependenciaAdministrativa: 'Privada'
  }
];

class InstitutionSeeder extends Seeder {
  async shouldRun() {
    return Institution.countDocuments()
      .exec()
      .then(count => count === 0);
  }

  async run() {
    return Institution.create(data);
  }
}

module.exports = InstitutionSeeder;
