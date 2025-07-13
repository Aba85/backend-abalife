// models/Usuario.js
module.exports = (sequelize, DataTypes) => {
  const Usuario = sequelize.define('Usuario', {
    nome: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    cpf: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    celular: {
      type: DataTypes.STRING,
      allowNull: false
    },
    senha: {
      type: DataTypes.STRING,
      allowNull: false
    },
    codigoIndicacao: {
      type: DataTypes.STRING,
      allowNull: true
    }
  });

  return Usuario;
};
