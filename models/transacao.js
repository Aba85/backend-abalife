module.exports = (sequelize, DataTypes) => {
  const Transacao = sequelize.define('Transacao', {
    usuario_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    tipo: {
      type: DataTypes.ENUM('corrida', 'recompensa', 'saque', 'ajuste', 'bonus'),
      allowNull: false,
    },
    valor: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    data: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  });

  Transacao.associate = (models) => {
    Transacao.belongsTo(models.Usuario, { foreignKey: 'usuario_id' });
  };

  return Transacao;
}; 



