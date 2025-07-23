const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  ssl: {
    rejectUnauthorized: false, // obrigatório para conexão com Render
  },
});

pool.connect()
  .then(() => {
    console.log('🟢 Conexão com PostgreSQL estabelecida com sucesso!');
  })
  .catch(err => {
    console.error('🔴 Erro ao conectar no PostgreSQL:', err.message);
});

module.exports = pool; 





