const { DataTypes } = require('sequelize');
const sequelize = require('./index');

const LogAcesso = sequelize.define('LogAcesso', {
  usuario_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  tipo_usuario: {
    type: DataTypes.ENUM('motorista', 'passageiro'),
    allowNull: false,
  },
  acao: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  descricao: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  ip: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  dispositivo: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  data: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'logs_acesso',
  timestamps: true,
});

module.exports = LogAcesso;
