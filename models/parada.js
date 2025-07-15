module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Parada', {
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
      };
