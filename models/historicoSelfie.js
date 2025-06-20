const { DataTypes } = require('sequelize');
const sequelize = require('./index');

const HistoricoSelfie = sequelize.define('HistoricoSelfie', {
  usuario_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  tipo: {
    type: DataTypes.ENUM('motorista', 'passageiro'),
    allowNull: false,
  },
  imagem_url: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  resultado: {
    type: DataTypes.ENUM('validada', 'rejeitada', 'pendente'),
    defaultValue: 'pendente',
  },
  motivo_falha: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  data_envio: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'historico_selfies',
  timestamps: true,
});

module.exports = HistoricoSelfie;
