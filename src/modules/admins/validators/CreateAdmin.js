const joi = require('joi');

module.exports = {
  body: {
    nome: joi
      .string()
      .trim()
      .required()
      .min(3)
      .label('Nome'),
    cpf: joi
      .string()
      .trim()
      .length(11)
      .regex(new RegExp('^[0-9]+$'), { name: 'é composto apenas por numeros' })
      .required()
      .label('CPF'),
    email: joi
      .string()
      .lowercase()
      .trim()
      .required()
      .email()
      .label('E-mail'),
    telefone: joi
      .string()
      .trim()
      .required()
      .label('Telefone'),
    senha: joi
      .string()
      .trim()
      .min(6)
      .required()
      .label('Senha')
  }
};
