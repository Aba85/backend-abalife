const { DataTypes } = require('sequelize');
const sequelize = require('./index');

const Avaliacao = sequelize.define('Avaliacao', {
  avaliador_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  avaliado_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  tipo: {
    type: DataTypes.ENUM('motorista', 'passageiro'),
    allowNull: false,
  },
  nota: {
    type: DataTypes.FLOAT,
    allowNull: false,
    validate: {
      min: 1,
      max: 5,
    },
  },
  comentario: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  corrida_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
}, {
  tableName: 'avaliacoes',
  timestamps: true,
});

module.exports = Avaliacao;
