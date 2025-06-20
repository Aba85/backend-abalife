const { DataTypes } = require('sequelize');
const sequelize = require('./index');

const Corrida = sequelize.define('Corrida', {
  id_motorista: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  id_passageiro: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  origem: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  destino: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('pendente', 'aceita', 'concluida', 'cancelada'),
    defaultValue: 'pendente',
  },
  distancia_km: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  valor_total: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  forma_pagamento: {
    type: DataTypes.ENUM('dinheiro', 'pix', 'cartao'),
    allowNull: false,
  },
  data_hora: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'corridas',
  timestamps: true,
});

module.exports = Corrida;
