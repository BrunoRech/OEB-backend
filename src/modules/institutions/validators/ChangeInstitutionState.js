const joi = require('joi');

module.exports = {
  body: {
    ativa: joi
      .boolean()
      .required()
      .label('Ativa')
  }
};
