const { DataTypes } = require('sequelize');
const sequelize = require('./index');

const Usuario = sequelize.define('Usuario', {
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  tipo: {
    type: DataTypes.ENUM('motorista', 'passageiro'),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
  },
  senha: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'usuarios',
  timestamps: true,
});

module.exports = Usuario;
