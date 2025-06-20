const { DataTypes } = require('sequelize');
const sequelize = require('./index');

const Transacao = sequelize.define('Transacao', {
  usuario_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  tipo: {
    type: DataTypes.ENUM('corrida', 'recompensa', 'saque', 'ajuste', 'bonus'),
    allowNull: false,
  },
  origem: {
    type: DataTypes.ENUM('sistema', 'admin', 'indicacao', 'corrida', 'outro'),
    allowNull: false,
  },
  descricao: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  valor: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  data_transacao: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'transacoes',
  timestamps: true,
});

module.exports = Transacao;
