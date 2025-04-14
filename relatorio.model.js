const mongoose = require('mongoose');

const relatorioSchema = new mongoose.Schema({
  caso: { type: mongoose.Schema.Types.ObjectId, ref: 'Case', required: true },
  texto: { type: String, required: true },
  autor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  criadoEm: { type: Date, default: Date.now } // datetime registrado automaticamente
});

module.exports = mongoose.model('Relatorio', relatorioSchema);
