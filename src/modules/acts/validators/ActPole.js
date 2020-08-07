const joi = require('joi');

module.exports = {
  body: {
    numeroAto: joi
      .string()
      .trim()
      .required()
      .label('Número Ato'),
    arquivoAto: joi
      .string()
      .trim()
      .required()
      .label('Arquivo Ato'),
    validadeAto: joi
      .date()
      .required()
      .label('Validade Ato'),
    ato: joi
      .string()
      .trim()
      .required()
      .label('Ato'),
    polo: joi
      .string()
      .trim()
      .required()
      .label('Polo')
  }
};
