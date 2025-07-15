module.exports = (sequelize, DataTypes) => {
  return sequelize.define('HistoricoSelfie', {
  usuario_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  tipo: {
    type: DataTypes.ENUM('motorista', 'passageiro')
     },
  });
}; 