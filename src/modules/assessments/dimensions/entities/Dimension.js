const mongoose = require('mongoose');

const { applyDiffLogPlugin } = require('../../../../shared/utils/applyDiffLog');
const Indicator = require('../../indicators/entities/Indicator');

const DimensionSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: true
  },
  descricao: {
    type: String,
    required: true
  },
  formulario: {
    type: mongoose.Schema.ObjectId,
    ref: 'Form',
    require: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

DimensionSchema.pre('remove', async function (next) {
  const indicators = await Indicator.find().where({ dimensao: this._id });
  indicators.forEach(indicator => {
    indicator.remove();
  });
  next();
});

applyDiffLogPlugin(DimensionSchema);

module.exports = mongoose.model('Dimension', DimensionSchema);
