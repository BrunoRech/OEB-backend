const joi = require('joi');

module.exports = {
  body: {
    relatoFinal: joi
      .string()
      .trim()
      .required()
      .min(3)
      .label('Relato Final'),
  }
};
