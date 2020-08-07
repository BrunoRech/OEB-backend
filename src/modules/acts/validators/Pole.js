const joi = require('joi');

module.exports = {
  body: {
    telefoneFixo: joi
      .string()
      .trim()
      .required()
      .label('Telefone fixo'),
    emailResponsavel: joi
      .string()
      .lowercase()
      .trim()
      .required()
      .label('E-mail responsável'),
    endereco: joi
      .string()
      .trim()
      .required()
      .label('Endereço'),
    numero: joi
      .number()
      .required()
      .min(0)
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
    })
  }
};
