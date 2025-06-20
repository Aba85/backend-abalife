const { DataTypes } = require('sequelize');
const sequelize = require('./index');

const BairroPrioridade = sequelize.define('BairroPrioridade', {
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cidade: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  estado: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ativo: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  tipo_prioridade: {
    type: DataTypes.ENUM('bonus', 'bloqueio', 'teste'),
    allowNull: false,
  },
  observacoes: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
}, {
  tableName: 'bairros_prioridade',
  timestamps: true,
});

module.exports = BairroPrioridade;
