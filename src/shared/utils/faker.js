const faker = require('faker');
const { fakerBr } = require('js-brasil');

const createInstitution = () => {
  return {
    cnpjMantenedora: fakerBr.cnpj(),
    razaoSocialMantenedora: faker.name.findName(),
    cnpj: fakerBr.cnpj(),
    razaoSocial: faker.name.findName(),
    nomeFantasia: faker.company.companyName(),
    cep: fakerBr.cep(),
    endereco: faker.address.streetName(),
    numero: faker.random.number(),
    municipio: faker.address.city(),
    site: faker.internet.url(),
    email: faker.internet.email(),
    senha: '123123',
    telefoneFixo: faker.phone.phoneNumber(),
    telefoneCelular: faker.phone.phoneNumber(),
    responsavelDados: faker.name.findName(),
    telefoneResponsavel: faker.phone.phoneNumber(),
    emailResponsavel: faker.internet.email(),
    secretario: faker.name.findName(),
    telefoneSecretario: faker.phone.phoneNumber(),
    emailSecretario: faker.internet.email(),
    diretor: faker.name.findName(),
    telefoneDiretor: faker.phone.phoneNumber(),
    emailDiretor: faker.internet.email(),
    dependenciaAdministrativa: faker.random.arrayElement(['Privada', 'Publica'])
  };
};

const createAct = () => {
  return {
    modalidade: faker.random.arrayElement([
      'Infantil',
      'Fundamental',
      'Médio',
      'EJA',
      'Escola indígena'
    ]),
    tipoMediacao: faker.random.arrayElement(['Presencial', 'Semi-presencial']),
    tipoCurriculo: faker.random.arrayElement([
      'Base do Território Caterinense'
    ]),
    parecer: faker.random.number(),
    tipoAto: faker.random.arrayElement(['Decreto', 'Portaria']),
    numeroAto: faker.random.number(),
    validadeCurriculo: faker.date.future(),
    validadeTipoAto: faker.date.future(),
    validadeParecer: faker.date.future(),
    arquivoCurriculo: faker.random.uuid(),
    arquivoParecer: faker.random.uuid(),
    arquivoAto: faker.random.uuid()
  };
};

const createInstitutions = num => {
  return new Array(num).fill(undefined).map(createInstitution);
};

const createActs = num => {
  return new Array(num).fill(undefined).map(createAct);
};

module.exports = { createInstitutions, createActs };
