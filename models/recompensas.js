const { DataTypes } = require('sequelize');
const sequelize = require('./index');

const Recompensa = sequelize.define('Recompensa', {
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
  valor: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('pendente', 'liberada', 'paga'),
    defaultValue: 'pendente',
  },
  data_gerada: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  referencia_corrida: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
}, {
  tableName: 'recompensas',
  timestamps: true,
});

module.exports = Recompensa;
