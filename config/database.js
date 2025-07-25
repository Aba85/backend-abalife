// config/database.js
require('dotenv').config();

module.exports = {
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || null,
  database: process.env.DB_NAME || 'abalife',
  host: process.env.DB_HOST || '127.0.0.1',
  dialect: 'postgres',
  logging: false
};





