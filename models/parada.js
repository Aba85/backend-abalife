const { DataTypes } = require('sequelize');
const sequelize = require('./index');

const Parada = sequelize.define('Parada', {
  corrida_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  ordem: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  endereco: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  latitude: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  longitude: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  tempo_espera: {
    type: DataTypes.INTEGER,
    defaultValue: 5,
  },
}, {
  tableName: 'paradas',
  timestamps: true,
});

module.exports = Parada;
