const mongoose = require('mongoose');

const { applyDiffLogPlugin } = require('../../../../shared/utils/applyDiffLog');

const LegalRequirementsSchema = new mongoose.Schema({
  titulo: {
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
})

applyDiffLogPlugin(LegalRequirementsSchema);

module.exports = mongoose.model("LegalRequirements", LegalRequirementsSchema);
