module.exports = (sequelize, DataTypes) => {
  const Corrida = sequelize.define('Corrida', {
    origem: DataTypes.STRING,
    destino: DataTypes.STRING,
    status: DataTypes.STRING, // pendente, aceita, concluída, cancelada
    passageiroId: DataTypes.INTEGER,
    motoristaId: DataTypes.INTEGER,
  });

  Corrida.associate = (models) => {
    Corrida.belongsTo(models.Usuario, { foreignKey: 'passageiroId', as: 'passageiro' });
    Corrida.belongsTo(models.Usuario, { foreignKey: 'motoristaId', as: 'motorista' });
  };

  return Corrida;
};



