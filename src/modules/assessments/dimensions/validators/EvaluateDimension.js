const joi = require('joi');

module.exports = {
  body: {
    relatoGlobal: joi
      .string()
      .trim()
      .required()
      .min(3)
      .label('Relato Global'),
  }
};
