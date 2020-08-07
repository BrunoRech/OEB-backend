const joi = require('joi');

module.exports = {
  body: {
    situacao: joi
      .string()
      .trim()
      .required()
      .label('Situação')
  }
};
