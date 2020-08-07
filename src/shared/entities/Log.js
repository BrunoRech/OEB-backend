const mongoose = require('mongoose');

const LogSchema = new mongoose.Schema(
  {
    collectionName: String,
    collectionId: mongoose.Schema.Types.ObjectId,
    diff: {},
    user: mongoose.Schema.Types.ObjectId,
    reason: String,
    version: { type: Number, min: 0 }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Log', LogSchema);
