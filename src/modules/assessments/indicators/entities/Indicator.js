const mongoose = require('mongoose');

const { applyDiffLogPlugin } = require('../../../../shared/utils/applyDiffLog');
const Criterion = require('../../criteria/entities/Criterion');
const CriterionDescriptor = require('../../criterionDescriptors/entities/CriterionDescriptor');

const IndicatorSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: true
  },
  dimensao: {
    type: mongoose.Schema.ObjectId,
    ref: 'Dimension',
    require: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

IndicatorSchema.pre('remove', function (next) {
  Criterion.remove({ indicador: this._id }).exec();
  CriterionDescriptor.remove({ indicador: this._id }).exec();
  next();
});

applyDiffLogPlugin(IndicatorSchema);

module.exports = mongoose.model('Indicator', IndicatorSchema);
