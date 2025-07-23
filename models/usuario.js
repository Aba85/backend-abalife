module.exports = (sequelize, DataTypes) => {
  const Usuario = sequelize.define('Usuario', {
    nome: DataTypes.STRING,
    email: DataTypes.STRING,
    senha: DataTypes.STRING,
    tipo: DataTypes.STRING, // 'passageiro', 'motorista', 'admin'
  });

  Usuario.associate = (models) => {
    Usuario.hasMany(models.Corrida, { foreignKey: 'passageiroId', as: 'corridasPassageiro' });
    Usuario.hasMany(models.Corrida, { foreignKey: 'motoristaId', as: 'corridasMotorista' });
  };

  return Usuario;
};


