const joi = require('joi');

module.exports = {
  body: {
    titulo: joi
      .string()
      .trim()
      .required()
      .min(3)
      .label('Título'),
    descricao: joi
      .string()
      .trim()
      .required()
      .min(4)
      .label('Descrição')
  }
};
