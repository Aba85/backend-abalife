module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Corrida', {
    origem: DataTypes.STRING,
    destino: DataTypes.STRING,
    status: DataTypes.STRING,
    valor: DataTypes.DECIMAL,
    tipo: DataTypes.ENUM('imediata', 'agendada', 'personalizada'),
    horarioAgendado: DataTypes.DATE,
    usuarioId: DataTypes.INTEGER
  });
}; 