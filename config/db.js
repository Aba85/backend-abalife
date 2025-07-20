const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

pool.connect()
  .then(() => {
    console.log('ðŸŸ¢ ConexÃ£o com PostgreSQL estabelecida com sucesso!');
  })
  .catch(err => {
    console.error('ðŸ”´ Erro ao conectar no PostgreSQL:', err.message);
});

module.exports = pool;




