module.exports = (sequelize, DataTypes) => {
  const CodigoIndicacao = sequelize.define('CodigoIndicacao', {
    codigo: {
      type: DataTypes.STRING,
      unique: true
    },
    usuarioId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    tipo: {
      type: DataTypes.ENUM('passageiro', 'motorista'),
      allowNull: false
    }
  });

  return CodigoIndicacao;
};
