const joi = require('joi');

module.exports = {
  body: {
    cpf: joi
      .string()
      .trim()
      .length(11)
      .required()
      .length(11)
      .regex(new RegExp('^[0-9]+$'), { name: 'é composto apenas por numeros' })
      .label('CPF'),
    senha: joi
      .string()
      .trim()
      .min(6)
      .required()
      .label('Senha')
  }
};
