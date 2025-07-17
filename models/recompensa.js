// caminho: models/Recompensa.js

const mongoose = require('mongoose');

const recompensaSchema = new mongoose.Schema({
  usuarioId: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
  descricao: { type: String, required: true },
  valor: { type: Number, required: true },
  data: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Recompensa', recompensaSchema);
