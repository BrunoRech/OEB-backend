const joi = require('joi');

module.exports = {
  body: {
    oldPassword: joi
      .string()
      .required()
      .trim()
      .min(6)
      .label('Senha antiga'),
    password: joi
      .string()
      .trim()
      .required()
      .min(6)
      .label('Nova senha'),
    confirmPassword: joi
      .string()
      .trim()
      .required()
      .min(6)
      .label('Confirmação da senha')
  }
};
