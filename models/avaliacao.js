module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Avaliacao', {
    avaliador_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    avaliado_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    tipo: {
      type: DataTypes.ENUM('motorista', 'passageiro'),
      allowNull: false,
    },
    nota: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    comentario: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  }, {
    tableName: 'avaliacoes',
    timestamps: true,
  });
  return Avaliacao;
};


