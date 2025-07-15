module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Carteira', {
    usuarioId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    saldo: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0
    }
  });

  Carteira.associate = (models) => {
    Carteira.belongsTo(models.Usuario, {
      foreignKey: 'usuarioId',
      as: 'usuario'
    });
  };

  return Carteira;
}; 
