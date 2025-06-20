const { DataTypes } = require('sequelize');
const sequelize = require('./index');

const MensagemSuporte = sequelize.define('MensagemSuporte', {
  usuario_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  tipo_usuario: {
    type: DataTypes.ENUM('motorista', 'passageiro'),
    allowNull: false,
  },
  mensagem: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  resposta_sistema: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  status: {
    type: DataTypes.ENUM('aberto', 'em_analise', 'resolvido'),
    defaultValue: 'aberto',
  },
  data_envio: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'mensagens_suporte',
  timestamps: true,
});

module.exports = MensagemSuporte;
