const joi = require('joi');

module.exports = {
  body: {
    razaoSocialMantenedora: joi
      .string()
      .trim()
      .required()
      .label('Razão social mantenedora'),
    email: joi
      .string()
      .trim()
      .lowercase()
      .required()
      .label('E-mail'),
    cnpj: joi
      .string()
      .trim()
      .required()
      .label('CNPJ'),
    razaoSocial: joi
      .string()
      .trim()
      .required()
      .label('Razão social'),
    nomeFantasia: joi
      .string()
      .trim()
      .required()
      .label('Nome fantasia'),
    cep: joi
      .string()
      .trim()
      .required()
      .label('CEP'),
    endereco: joi
      .string()
      .trim()
      .required()
      .label('Endereço'),
    numero: joi
      .number()
      .min(0)
      .required()
      .label('Número'),
    municipio: joi.object({
      id: joi
        .number()
        .required()
        .label('Município ID'),
      nome: joi
        .string()
        .trim()
        .required()
        .label('Nome município')
    }),
    site: joi
      .string()
      .trim()
      .required()
      .label('Site'),
    telefoneFixo: joi
      .string()
      .trim()
      .required()
      .label('Telefone fixo'),
    telefoneCelular: joi
      .string()
      .trim()
      .required()
      .label('Telefone celular'),
    responsavelDados: joi
      .string()
      .trim()
      .required()
      .label('Dados do responsável'),
    telefoneResponsavel: joi
      .string()
      .trim()
      .required()
      .label('Telefone responsável'),
    emailResponsavel: joi
      .string()
      .trim()
      .lowercase()
      .required()
      .label('E-mail responsável'),
    secretario: joi
      .string()
      .trim()
      .required()
      .label('Nome do secretário'),
    telefoneSecretario: joi
      .string()
      .trim()
      .required()
      .label('Telefone secretário'),
    emailSecretario: joi
      .string()
      .trim()
      .lowercase()
      .required()
      .label('E-mail secretário'),
    diretor: joi
      .string()
      .trim()
      .required()
      .label('Nome do diretor'),
    telefoneDiretor: joi
      .string()
      .trim()
      .required()
      .label('Telefone diretor'),
    emailDiretor: joi
      .string()
      .trim()
      .lowercase()
      .required()
      .label('E-mail diretor'),
    dependenciaAdministrativa: joi
      .string()
      .trim()
      .required()
      .label('Dependência administrativa')
  }
};
