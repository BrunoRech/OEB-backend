const { factory } = require('factory-girl');
const faker = require('faker');
const { fakerBr } = require('js-brasil');

const Act = require('../app/models/Act');
const Admin = require('../app/models/Admin');
const File = require('../app/models/File');
const Institution = require('../app/models/Institution');
const Pole = require('../app/models/Pole');

factory.define('Institution', Institution, {
  cnpjMantenedora: fakerBr.cnpj().replace(/[^0-9]+/g, ''),
  razaoSocialMantenedora: faker.name.findName(),
  cnpj: fakerBr.cnpj().replace(/[^0-9]+/g, ''),
  razaoSocial: faker.name.findName(),
  nomeFantasia: faker.company.companyName(),
  cep: fakerBr.cep(),
  endereco: faker.address.streetName(),
  numero: faker.random.number(),
  municipio: {
    id: faker.random.number(),
    nome: faker.address.city()
  },
  site: faker.internet.url(),
  email: faker.internet.email(),
  senha: '123123',
  telefoneFixo: faker.phone.phoneNumber().replace(/[^0-9]+/g, ''),
  telefoneCelular: faker.phone.phoneNumber().replace(/[^0-9]+/g, ''),
  responsavelDados: faker.name.findName(),
  telefoneResponsavel: faker.phone.phoneNumber().replace(/[^0-9]+/g, ''),
  emailResponsavel: faker.internet.email(),
  secretario: faker.name.findName(),
  telefoneSecretario: faker.phone.phoneNumber().replace(/[^0-9]+/g, ''),
  emailSecretario: faker.internet.email(),
  diretor: faker.name.findName(),
  telefoneDiretor: faker.phone.phoneNumber().replace(/[^0-9]+/g, ''),
  emailDiretor: faker.internet.email(),
  dependenciaAdministrativa: faker.random.arrayElement(['Privada', 'Publica'])
});

factory.define('Act', Act, {
  etapasEnsino: faker.random.arrayElement([
    'Infantil',
    'Fundamental',
    'Médio',
    'EJA',
    'Escola indígena'
  ]),
  tipoMediacao: faker.random.arrayElement(['Presencial', 'Semi-presencial']),
  tipoCurriculo: faker.random.arrayElement(['Base do Território Caterinense']),
  parecer: faker.random.word(),
  tipoAto: faker.random.arrayElement(['Decreto', 'Portaria']),
  numeroAto: faker.random.word(),
  validadeTipoAto: faker.date.future(),
  validadeParecer: faker.date.future(),
  arquivoParecer: '5e6fc522d97854668eeff94a',
  arquivoAto: '5e6fc522d97854668eeff94a'
});

factory.define('ProfessionalAct', Act, {
  etapasEnsino: 'Profissional',
  curso: faker.name.findName(),
  tipoMediacao: faker.random.arrayElement(['Presencial', 'Semi-presencial']),
  tipoCurriculo: faker.random.arrayElement(['Base do Território Caterinense']),
  parecer: faker.random.word(),
  tipoAto: faker.random.arrayElement(['Decreto', 'Portaria']),
  numeroAto: faker.random.word(),
  validadeTipoAto: faker.date.future(),
  validadeParecer: faker.date.future(),
  arquivoParecer: '5e6fc522d97854668eeff94a',
  arquivoAto: '5e6fc522d97854668eeff94a'
});

factory.define('EADAct', Act, {
  etapasEnsino: 'Profissional',
  curso: faker.name.findName(),
  tipoMediacao: 'EAD',
  tipoCurriculo: faker.random.arrayElement(['Base do Território Caterinense']),
  parecer: faker.random.word(),
  tipoAto: faker.random.arrayElement(['Decreto', 'Portaria']),
  numeroAto: faker.random.word(),
  validadeTipoAto: faker.date.future(),
  validadeParecer: faker.date.future(),
  arquivoParecer: '5e6fc522d97854668eeff94a',
  arquivoAto: '5e6fc522d97854668eeff94a'
});

factory.define('ActPole', Act, {
  numeroAto: faker.random.word(),
  validadeAto: faker.date.future(),
  arquivoAto: '5e6fc522d97854668eeff94a'
});

factory.define('OwnCurriculumAct', Act, {
  etapasEnsino: 'Profissional',
  curso: faker.name.findName(),
  tipoMediacao: faker.random.arrayElement(['Presencial', 'Semi-presencial']),
  tipoCurriculo: 'Próprio',
  parecer: faker.random.word(),
  curriculo: faker.random.word(),
  tipoAto: faker.random.arrayElement(['Decreto', 'Portaria']),
  numeroAto: faker.random.word(),
  validadeTipoAto: faker.date.future(),
  validadeCurriculo: faker.date.future(),
  validadeParecer: faker.date.future(),
  arquivoParecer: '5e6fc522d97854668eeff94a',
  arquivoCurriculo: '5e6fc522d97854668eeff94a',
  arquivoAto: '5e6fc522d97854668eeff94a'
});

factory.define('Pole', Pole, {
  emailResponsavel: faker.internet.email(),
  endereco: faker.address.streetName(),
  municipio: {
    id: faker.random.number(),
    nome: faker.address.city()
  },
  numero: faker.random.number(),
  telefoneFixo: faker.phone.phoneNumber()
});

factory.define('PoleValidate', Pole, {
  emailResponsavel: faker.internet.email(),
  endereco: faker.address.streetName(),
  municipio: {
    id: faker.random.number(),
    nome: faker.address.city()
  },
  numero: faker.random.number(),
  telefoneFixo: faker.phone.phoneNumber(),
  arquivoAto: '4356346545',
  validadeAto: faker.date.future()
});

factory.define('Admin', Admin, {
  nome: faker.name.findName(),
  cpf: fakerBr.cpf().replace(/[^0-9]+/g, ''),
  email: faker.internet.email(),
  telefone: faker.phone.phoneNumber().replace(/[^0-9]+/g, ''),
  senha: '123123',
  createdAt: faker.date.recent()
});

factory.define('File', File, {
  name: faker.name.findName(),
  size: faker.random.number(),
  key: faker.random.word(),
  field: faker.random.word(),
  idFile: faker.random.uuid(),
  createdAt: faker.date.recent()
});

factory.define('Form', File, {
  titulo: faker.name.findName(),
  anoAplicacao: faker.random.word(),
});

module.exports = factory;
