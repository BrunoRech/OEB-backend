const mongoose = require('mongoose');
const aggregatePaginate = require('mongoose-aggregate-paginate-v2');

const File = require('../../files/entities/File');

const ActSchema = new mongoose.Schema(
  {
    instituicao: {
      type: mongoose.Schema.ObjectId,
      ref: 'Instituicao',
      required: true
    },
    etapasEnsino: {
      type: String,
      required: true
    },
    tipoMediacao: {
      type: String,
      required: true
    },
    curso: {
      type: String
    },
    tipoCurriculo: {
      type: String,
      required: true
    },
    parecer: {
      type: String,
      required: true
    },
    curriculo: {
      type: String
    },
    tipoAto: {
      type: String,
      required: true
    },
    numeroAto: {
      type: String,
      required: true
    },
    validadeCurriculo: {
      type: Date
    },
    validadeTipoAto: {
      type: Date,
      required: true
    },
    validadeParecer: {
      type: Date,
      required: true
    },
    arquivoCurriculo: {
      type: String
    },
    arquivoParecer: {
      type: String,
      required: true
    },
    arquivoAto: {
      type: String,
      required: true
    },
    preparadoParaAvaliacao: {
      type: Boolean,
      default: true
    },
    isApproved: {
      type: Boolean,
      default: false
    },
    wasSeen: {
      type: Boolean,
      default: false
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    toJSON: {
      transform: (doc, ret) => {
        const act = ret;
        delete act.__v;
        return act;
      }
    }
  }
);

ActSchema.plugin(aggregatePaginate);

ActSchema.pre('remove', async function (next) {
  await File.find()
    .where({ _id: this.arquivoAto })
    .remove();

  await File.find()
    .where({ _id: this.arquivoParecer })
    .remove();

  if (this.arquivoCurriculo) {
    await File.find()
      .where({ _id: this.arquivoCurriculo })
      .remove();
  }

  next();
});

module.exports = mongoose.model('Ato', ActSchema);
