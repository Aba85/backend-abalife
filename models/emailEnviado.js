module.exports = (sequelize, DataTypes) => {
  return sequelize.define('EmailEnviado', {
  usuario_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  tipo: {
    type: DataTypes.ENUM('cadastro', 'recuperacao_senha', 'recompensa', 'outro')
     },
  });
}; 

