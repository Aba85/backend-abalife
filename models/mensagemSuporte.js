module.exports = (sequelize, DataTypes) => {
  return sequelize.define('MensagemSuporte', {
  usuario_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  tipo_usuario: {
    type: DataTypes.ENUM('motorista', 'passageiro')
    },
  });
}; 