const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Corrida = sequelize.define('Corrida', {
    origem: DataTypes.STRING,
    destino: DataTypes.STRING,
    status: {
      type: DataTypes.STRING,
      defaultValue: 'pendente',
    },
    passageiroId: DataTypes.INTEGER,
    valor: DataTypes.FLOAT,
    motoristaId: DataTypes.INTEGER,
    dataHora: DataTypes.DATE,
  });

  return Corrida;
};

