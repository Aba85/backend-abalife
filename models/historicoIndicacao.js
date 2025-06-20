const { DataTypes } = require('sequelize');
const sequelize = require('./index');

const HistoricoIndicacao = sequelize.define('HistoricoIndicacao', {
  indicador_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  indicado_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  tipo: {
    type: DataTypes.ENUM('motorista', 'passageiro'),
    allowNull: false,
  },
  data_vinculo: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  codigo_utilizado: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  ativo: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
}, {
  tableName: 'historico_indicacoes',
  timestamps: true,
});

module.exports = HistoricoIndicacao;
