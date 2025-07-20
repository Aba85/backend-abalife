module.exports = (sequelize, DataTypes) => {
  return sequelize.define('CodigoIndicacao', {
    codigo: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    usuarioId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });
}; 


