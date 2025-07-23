module.exports = (sequelize, DataTypes) => {
  return sequelize.define('AgendaCorrida', {
    passageiro_id: { type: DataTypes.INTEGER, allowNull: false },
    categoria: { type: DataTypes.ENUM('alpha', 'delta', 'omega', 'mala', 'entrega', 'arca'), allowNull: false },
    endereco_origem: { type: DataTypes.STRING, allowNull: false },
    endereco_destino: { type: DataTypes.STRING, allowNull: false },
    data_hora: { type: DataTypes.DATE, allowNull: false },
    status: { type: DataTypes.ENUM('pendente', 'atribuida', 'cancelada', 'concluida'), defaultValue: 'pendente' },
    motorista_id: { type: DataTypes.INTEGER, allowNull: true },
    valor_previsto: { type: DataTypes.FLOAT, allowNull: true },
  }, {
    tableName: 'agenda_corridas',
    timestamps: true,
  });
  return Agendarcorrida;
   };




