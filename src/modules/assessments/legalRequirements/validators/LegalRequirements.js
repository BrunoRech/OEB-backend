const joi = require('joi');

module.exports = {
  body: {
    titulo: joi
      .string()
      .trim()
      .required()
      .min(3)
      .label('Título'),
  }
};
