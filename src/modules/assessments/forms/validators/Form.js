const joi = require('joi');

module.exports = {
  body: {
    titulo: joi
      .string()
      .trim()
      .required()
      .min(3)
      .label('Título'),
    anoAplicacao: joi
      .string()
      .trim()
      .required()
      .min(4)
      .label('Ano aplicação'),
    dataLimite: joi.date().label('Data limite'),
  }
};
