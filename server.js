require('dotenv').config(); // Carrega variáveis do .env

const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

// Conexão principal com Sequelize
const sequelize = require('./models');

// 🧠 Carrega automaticamente todos os modelos da pasta /models
const modelsPath = path.join(__dirname, 'models');
fs.readdirSync(modelsPath)
  .filter(file => file.endsWith('.js') && file !== 'index.js')
  .forEach(file => {
    require(path.join(modelsPath, file));
  });

// Sincroniza o banco de dados com todos os modelos carregados
sequelize.sync({ alter: true })
  .then(() => {
    console.log('✅ Tabelas sincronizadas com sucesso!');
  })
  .catch((err) => {
    console.error('❌ Erro ao sincronizar tabelas:', err.message);
  });

// Rota principal para teste
app.get('/', (req, res) => {
  res.send('API Aba Life funcionando!');
});

// Inicializa o servidor
app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});

