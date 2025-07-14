module.exports = (sequelize, DataTypes) => {
  const Indicacao = sequelize.define('Indicacao', {
    indicanteId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    indicadoId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  Indicacao.associate = (models) => {
    Indicacao.belongsTo(models.Usuario, { as: 'Indicante', foreignKey: 'indicanteId' });
    Indicacao.belongsTo(models.Usuario, { as: 'Indicado', foreignKey: 'indicadoId' });
  };

  return Indicacao;
};
