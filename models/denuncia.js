module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Denuncia', {
    autor_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    alvo_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    tipo_alvo: {
      type: DataTypes.ENUM(['motorista', 'passageiro']),
      allowNull: false,
    },
  });
}; 

