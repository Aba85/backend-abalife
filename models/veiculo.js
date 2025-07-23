module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Veiculo', {
  motorista_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  modelo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  placa: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  ano: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  categoria: {
    type: DataTypes.ENUM('alpha', 'delta', 'omega', 'mala', 'entrega', 'arca')
     },
  });
}; 




