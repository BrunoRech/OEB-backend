const joi = require('joi');

module.exports = {
  body: {
    cnpj: joi
      .string()
      .trim()
      .required()
      .label('CNPJ'),
    senha: joi
      .string()
      .trim()
      .required()
      .label('Senha')
  }
};
