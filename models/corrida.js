module.exports = (sequelize, DataTypes) => {
  const Corrida = sequelize.define('Corrida', {
    passageiro_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    motorista_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    origem: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    destino: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    valor: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    dataHora: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    personalizada: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    agendada: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    codigo_motorista_personalizado: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  }, {
    tableName: 'corridas',
    timestamps: true,
  });

  return Corrida;
};
