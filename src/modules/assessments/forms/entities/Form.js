const mongoose = require('mongoose');

const { applyDiffLogPlugin } = require('../../../../shared/utils/applyDiffLog');
const Dimension = require('../../dimensions/entities/Dimension');
const LegalRequirements = require('../../legalRequirements/entities/LegalRequirements');

const FormSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: true
  },
  anoAplicacao: {
    type: String,
    required: true
  },
  situacao: {
    type: String,
    default: '1'
  },
  dataLimite: {
    type: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

FormSchema.pre('remove', async function (next) {
  const dimensions = await Dimension.find().where({ formulario: this._id });
  dimensions.forEach(dimension => {
    dimension.remove();
  });

  const requirements = await LegalRequirements.find().where({ formulario: this._id });
  requirements.forEach(requirement => {
    requirement.remove();
  });
  next();
});

applyDiffLogPlugin(FormSchema);

module.exports = mongoose.model('Form', FormSchema);
