const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const { applyDiffLogPlugin } = require('../../../shared/utils/applyDiffLog');

const InstitutionSchema = new mongoose.Schema(
  {
    cnpjMantenedora: {
      type: String,
      required: true
    },
    razaoSocialMantenedora: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },
    cnpj: {
      type: String,
      required: true,
      unique: true
    },
    razaoSocial: {
      type: String,
      required: true
    },
    nomeFantasia: {
      type: String,
      required: true
    },
    cep: {
      type: String,
      required: true
    },
    endereco: {
      type: String,
      required: true
    },
    numero: {
      type: Number,
      required: true
    },
    municipio: {
      id: { type: Number, required: true },
      nome: { type: String, required: true }
    },
    site: {
      type: String,
      required: true
    },
    telefoneFixo: {
      type: String,
      required: true
    },
    telefoneCelular: {
      type: String,
      required: true
    },
    responsavelDados: {
      type: String,
      required: true
    },
    telefoneResponsavel: {
      type: String,
      required: true
    },
    emailResponsavel: {
      type: String,
      required: true
    },
    secretario: {
      type: String,
      required: true
    },
    telefoneSecretario: {
      type: String,
      required: true
    },
    emailSecretario: {
      type: String,
      required: true
    },
    diretor: {
      type: String,
      required: true
    },
    telefoneDiretor: {
      type: String,
      required: true
    },
    emailDiretor: {
      type: String,
      required: true
    },
    dependenciaAdministrativa: {
      type: String
    },
    senha: {
      type: String,
      required: true
    },
    ativa: {
      type: Boolean,
      default: true
    }
  },
  {
    toJSON: {
      transform: (doc, ret) => {
        const institution = ret;
        delete institution.__v;
        delete institution.senha;
        return institution;
      }
    }
  },
  {
    timestamps: true
  }
);

InstitutionSchema.plugin(mongoosePaginate);
applyDiffLogPlugin(InstitutionSchema);

module.exports = mongoose.model('Institution', InstitutionSchema);
