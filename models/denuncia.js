const { DataTypes } = require('sequelize');
const sequelize = require('./index');

const Denuncia = sequelize.define('Denuncia', {
  autor_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  alvo_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  tipo_alvo: {
    type: DataTypes.ENUM('motorista', 'passageiro'),
    allowNull: false,
  },
  corrida_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  motivo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  descricao: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  status: {
    type: DataTypes.ENUM('pendente', 'em_analise', 'resolvida'),
    defaultValue: 'pendente',
  },
  data_denuncia: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'denuncias',
  timestamps: true,
});

module.exports = Denuncia;
