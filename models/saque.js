const { DataTypes } = require('sequelize');
const sequelize = require('./index');

const Saque = sequelize.define('Saque', {
  usuario_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  valor: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('pendente', 'aprovado', 'recusado', 'pago'),
    defaultValue: 'pendente',
  },
  tipo: {
    type: DataTypes.ENUM('corrida', 'recompensa', 'ambos'),
    allowNull: false,
  },
  pix: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  data_pedido: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'saques',
  timestamps: true,
});

module.exports = Saque;
