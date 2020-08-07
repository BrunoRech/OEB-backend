const joi = require('joi');

module.exports = {
  body: {
    requisitos: joi.array().items(joi.object({
      requisito: joi
        .string()
        .trim()
        .required()
        .label('Requisito legal'),
      atende: joi
        .number()
        .integer()
        .min(0)
        .max(1)
        .required()
        .label('Resposta do requisito'),
    }))
  }
};
