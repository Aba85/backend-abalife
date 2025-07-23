module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Documento', {
    usuario_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    tipo_documento: {
      type: DataTypes.ENUM(['rg', 'cnh', 'comprovante_residencia', 'outro']),
      allowNull: false,
    },
  });
}; 



