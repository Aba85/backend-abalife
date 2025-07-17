const mongoose = require('mongoose');

const corridaSchema = new mongoose.Schema({
  passageiroId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true,
  },
  motoristaId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
  },
  origem: {
    type: String,
    required: true,
  },
  destino: {
    type: String,
    required: true,
  },
  preco: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['pendente', 'aceita', 'em_andamento', 'finalizada'],
    default: 'pendente',
  },
  dataHoraChamada: {
    type: Date,
    default: Date.now,
  },
  dataHoraInicio: Date,
  dataHoraFim: Date,
});

module.exports = mongoose.model('Corrida', corridaSchema);
