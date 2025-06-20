const { DataTypes } = require('sequelize');
const sequelize = require('./index');

const Veiculo = sequelize.define('Veiculo', {
  motorista_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  modelo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  placa: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  ano: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  categoria: {
    type: DataTypes.ENUM('alpha', 'delta', 'omega', 'mala', 'entrega', 'arca'),
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('ativo', 'pendente', 'reprovado'),
    defaultValue: 'pendente',
  },
  observacoes: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
}, {
  tableName: 'veiculos',
  timestamps: true,
});

module.exports = Veiculo;
