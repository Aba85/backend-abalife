// models/Indicacao.js
module.exports = (sequelize, DataTypes) => {
  const Indicacao = sequelize.define('Indicacao', {
    indicadoCpf: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    indicanteCpf: {
      type: DataTypes.STRING,
      allowNull: false
    },
    confirmado: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  });

  return Indicacao;
};
