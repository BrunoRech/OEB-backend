const mongoose = require('mongoose');

const ActPoleSchema = new mongoose.Schema({
  numeroAto: {
    type: String,
    required: true
  },
  arquivoAto: {
    type: String,
    required: true
  },
  validadeAto: {
    type: Date,
    required: true
  },
  ato: {
    type: mongoose.Schema.ObjectId,
    ref: 'Ato',
    required: true
  },
  polo: {
    type: mongoose.Schema.ObjectId,
    ref: 'Polo',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('AtoPolo', ActPoleSchema);
