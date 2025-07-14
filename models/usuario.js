const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Usuario = sequelize.define('Usuario', {
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  cpf: {
    type: DataTypes.STRING(11),
    allowNull: false,
    unique: true,
  },
  celular: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  senha: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  codigoIndicacao: {
    type: DataTypes.STRING,
    allowNull: true, // Opcional no cadastro
  },
  perfil: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'passageiro', // Valor padrão
  }
}, {
  tableName: 'usuarios',
});

module.exports = Usuario; 