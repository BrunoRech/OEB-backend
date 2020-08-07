const mongoose = require('mongoose');

const { applyDiffLogPlugin } = require('../../../shared/utils/applyDiffLog');

const AdminSchema = new mongoose.Schema(
  {
    nome: {
      type: String,
      required: true
    },
    cpf: {
      type: String,
      required: true,
      unique: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    telefone: {
      type: String,
      required: true
    },
    senha: {
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
        const admin = ret;
        delete admin.__v;
        delete admin.senha;
        return admin;
      }
    }
  }
);

applyDiffLogPlugin(AdminSchema);

module.exports = mongoose.model('Admin', AdminSchema);
