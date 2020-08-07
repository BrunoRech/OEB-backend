const mongoose = require('mongoose');

const { applyDiffLogPlugin } = require('../../../../shared/utils/applyDiffLog');

const CriterionDescriptor = new mongoose.Schema({
  conceito: {
    type: Number,
    required: true
  },
  descricao: {
    type: String,
    required: true
  },
  valorMinimo: {
    type: Number,
    required: true
  },
  valorMaximo: {
    type: Number,
    required: true
  },
  indicador: {
    type: mongoose.Schema.ObjectId,
    ref: 'Indicator',
    require: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

applyDiffLogPlugin(CriterionDescriptor);

module.exports = mongoose.model('CriterionDescriptor', CriterionDescriptor);
