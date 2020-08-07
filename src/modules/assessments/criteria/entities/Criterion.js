const mongoose = require('mongoose');

const { applyDiffLogPlugin } = require('../../../../shared/utils/applyDiffLog');

const CriterionSchema = new mongoose.Schema({
  titulo: {
    type: String,
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

applyDiffLogPlugin(CriterionSchema);

module.exports = mongoose.model('Criterion', CriterionSchema);
