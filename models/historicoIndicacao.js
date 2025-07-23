module.exports = (sequelize, DataTypes) => {
  return sequelize.define('HistoricoIndicacao', {
  indicador_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  indicado_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  tipo: {
    type: DataTypes.ENUM('motorista', 'passageiro')
    },
  });
}; 



