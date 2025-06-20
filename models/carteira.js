const { DataTypes } = require('sequelize');
const sequelize = require('./index');

const Carteira = sequelize.define('Carteira', {
  usuario_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  tipo: {
    type: DataTypes.ENUM('motorista', 'passageiro'),
    allowNull: false,
  },
  saldo: {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 0.0,
  },
  ultima_atualizacao: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'carteiras',
  timestamps: true,
});

module.exports = Carteira;
