module.exports = (sequelize, DataTypes) => {
  return sequelize.define('BairroPrioridade', {
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cidade: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    estado: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ativo: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    tipo_prioridade: {
      type: DataTypes.ENUM('bonus', 'bloqueio', 'teste'),
    }
  });
  return Bairroprioridade;
   };


