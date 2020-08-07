const joi = require('joi');

module.exports = {
  body: {
    etapasEnsino: joi
      .string()
      .trim()
      .required()
      .label('Etapas de Ensino'),
    tipoMediacao: joi
      .string()
      .trim()
      .required()
      .label('Tipo mediação'),
    curso: joi
      .string()
      .trim()
      .label('Curso')
      .when('etapasEnsino', {
        is: 'Profissional',
        then: joi.required()
      }),
    parecer: joi
      .string()
      .trim()
      .required()
      .label('Parecer'),
    tipoCurriculo: joi
      .string()
      .trim()
      .required()
      .label('Tipo Currículo'),
    curriculo: joi
      .string()
      .trim()
      .label('Currículo')
      .when('tipoCurriculo', {
        is: 'Próprio',
        then: joi.required()
      }),
    numeroAto: joi
      .string()
      .trim()
      .required()
      .label('Número do Ato'),
    arquivoAto: joi
      .string()
      .trim()
      .required()
      .label('Arquivo do Ato'),
    arquivoCurriculo: joi
      .string()
      .trim()
      .label('Arquivo Currículo')
      .when('tipoCurriculo', {
        is: 'Próprio',
        then: joi.required()
      }),
    arquivoParecer: joi
      .string()
      .trim()
      .required()
      .label('Arquivo Parecer'),
    validadeCurriculo: joi.date().when('tipoCurriculo', {
      is: 'Próprio',
      then: joi.required()
    }),
    validadeTipoAto: joi.date().required(),
    validadeParecer: joi.date().required()
  }
};
