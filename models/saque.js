// models/saque.js
module.exports = (sequelize, DataTypes) => {
  const Saque = sequelize.define('Saque', {
    usuarioId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    valor: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('pendente', 'processado', 'recusado'),
      defaultValue: 'pendente',
    },
    tipo: {
      type: DataTypes.ENUM('recompensa', 'corrida'),
      allowNull: false,
    }
  });

  Saque.associate = (models) => {
    Saque.belongsTo(models.Usuario, {
      foreignKey: 'usuarioId',
      as: 'usuario'
    });
  };

  return Saque;
}; 