module.exports = (sequelize, DataTypes) => {
  const Corrida = sequelize.define('Corrida', {
    origem: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    destino: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dataHora: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('pendente', 'aceita', 'em_andamento', 'finalizada', 'cancelada'),
      defaultValue: 'pendente',
    },
    passageiroId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    motoristaId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    personalizada: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    }
  });

  Corrida.associate = (models) => {
    Corrida.belongsTo(models.Usuario, { as: 'passageiro', foreignKey: 'passageiroId' });
    Corrida.belongsTo(models.Usuario, { as: 'motorista', foreignKey: 'motoristaId' });
  };

  return Corrida;
};




