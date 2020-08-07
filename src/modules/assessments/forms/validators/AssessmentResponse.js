const joi = require('joi');

module.exports = {
  body: {
    criterios: joi.array().items(joi.object({
      criterio: joi
        .string()
        .trim()
        .required()
        .label('Critério'),
      atende: joi
        .number()
        .integer()
        .min(0)
        .max(1)
        .required()
        .label('Responsta do critério'),
    }))
  }
};
