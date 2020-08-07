const mongoose = require('mongoose');

const PoleSchema = new mongoose.Schema(
  {
    instituicao: {
      type: mongoose.Schema.ObjectId,
      ref: 'Instituicao',
      required: true
    },
    emailResponsavel: {
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
    telefoneFixo: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    toJSON: {
      transform: (doc, ret) => {
        const pole = ret;
        delete pole.__v;
        return pole;
      }
    }
  }
);

module.exports = mongoose.model('Polo', PoleSchema);
