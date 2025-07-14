module.exports = (sequelize, DataTypes) => {
  const Recompensa = sequelize.define('Recompensa', {
    usuarioId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    descricao: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    valor: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('disponivel', 'resgatado'),
      defaultValue: 'disponivel',
    },
  });

  Recompensa.associate = (models) => {
    Recompensa.belongsTo(models.Usuario, { foreignKey: 'usuarioId' });
  };

  return Recompensa;
};
