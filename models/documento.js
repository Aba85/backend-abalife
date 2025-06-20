const { DataTypes } = require('sequelize');
const sequelize = require('./index');

const Documento = sequelize.define('Documento', {
  usuario_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  tipo_documento: {
    type: DataTypes.ENUM('rg', 'cnh', 'comprovante_residencia', 'outro'),
    allowNull: false,
  },
  arquivo_url: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('pendente', 'validado', 'rejeitado'),
    defaultValue: 'pendente',
  },
  motivo_rejeicao: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  data_envio: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'documentos',
  timestamps: true,
});

module.exports = Documento;
