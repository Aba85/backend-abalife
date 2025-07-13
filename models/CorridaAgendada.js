// models/CorridaAgendada.js
module.exports = (sequelize, DataTypes) => {
  const CorridaAgendada = sequelize.define('CorridaAgendada', {
    passageiroCpf: {
      type: DataTypes.STRING,
      allowNull: false
    },
    motoristaCpf: {
      type: DataTypes.STRING,
      allowNull: true
    },
    origem: {
      type: DataTypes.STRING,
      allowNull: false
    },
    destino: {
      type: DataTypes.STRING,
      allowNull: false
    },
    dataHoraAgendada: {
      type: DataTypes.DATE,
      allowNull: false
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: 'pendente' // pendente, aceita, concluída, cancelada
    },
    tipo: {
      type: DataTypes.STRING, // agendada | personalizada
      allowNull: false
    },
    valor: {
      type: DataTypes.FLOAT,
      allowNull: true
    }
  });

  return CorridaAgendada;
};
