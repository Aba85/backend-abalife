module.exports = (sequelize, DataTypes) => {
  const Recompensa = sequelize.define('Recompensa', {
    indicante_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    indicado_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    corrida_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    valor: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    tipo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    data: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  }, {
    tableName: 'recompensas',
    timestamps: true,
  });

  return Recompensa;
};
