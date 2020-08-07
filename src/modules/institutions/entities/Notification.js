const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: true
  },
  tipo: {
    type: Number,
    required: true
  },
  conteudo: {
    type: String,
    default: null
  },
  instituicao: {
    type: mongoose.Schema.ObjectId,
    ref: 'Institution',
    required: true
  },
  dadosEntidade: {
    type: Object,
    required: true
  },
  lida: {
    type: Boolean,
    required: true,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Notification', NotificationSchema);
