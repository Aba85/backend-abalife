const { DataTypes } = require('sequelize');
const sequelize = require('./index');

const EmailEnviado = sequelize.define('EmailEnviado', {
  usuario_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  tipo: {
    type: DataTypes.ENUM('cadastro', 'recuperacao_senha', 'recompensa', 'outro'),
    allowNull: false,
  },
  titulo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  conteudo: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  status_envio: {
    type: DataTypes.ENUM('enviado', 'erro', 'pendente'),
    defaultValue: 'pendente',
  },
  data_envio: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'emails_enviados',
  timestamps: true,
});

module.exports = EmailEnviado;
