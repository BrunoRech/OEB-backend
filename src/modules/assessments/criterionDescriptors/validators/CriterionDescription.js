const joi = require('joi');

module.exports = {
  body: {
    conceito: joi
      .number()
      .required()
      .label('Conceito'),
    descricao: joi
      .string()
      .trim()
      .required()
      .min(3)
      .label('Descricão'),
    valorMinimo: joi
      .number()
      .required()
      .label('Conceito'),
    valorMaximo: joi
      .number()
      .required()
      .label('Conceito')
  }
};
