const { DataTypes } = require('sequelize');
const sequelize = require('./index');

const PagamentoPessoal = sequelize.define('PagamentoPessoal', {
  motorista_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  passageiro_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  valor: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  valor_maximo: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  aceito_pelo_app: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  data_corrida: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'pagamentos_pessoais',
  timestamps: true,
});

module.exports = PagamentoPessoal;
