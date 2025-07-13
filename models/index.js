const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
    logging: false,
  }
);

const Usuario = require('./usuario')(sequelize, DataTypes);
const Corrida = require('./Corrida')(sequelize, DataTypes);

Usuario.hasMany(Corrida, { foreignKey: 'passageiroId' });
Corrida.belongsTo(Usuario, { foreignKey: 'passageiroId' });

module.exports = {
  sequelize,
  Usuario,
  Corrida,
}; 