// server.js

const express = require('express');
const cors = require('cors');
const app = express();

// Middlewares globais
app.use(express.json());
app.use(cors());

// Importação das rotas
const corridasAgendadasRoutes = require('./routes/corridasAgendadas.js');
const identidadeRoutes = require('./routes/identidade.js');
const relatorioRoutes = require('./routes/relatorios.js');
const usuarioRoutes = require('./routes/usuario.js');

// Uso das rotas com prefixo
app.use('/corridas-agendadas', corridasAgendadasRoutes);
app.use('/identidade', identidadeRoutes);
app.use('/relatorios', relatorioRoutes);
app.use('/usuarios', usuarioRoutes); // <-- prefixo corrigido

// Sincronização do banco de dados
const db = require('./models');
db.sequelize.sync({ alter: true })
  .then(() => {
    console.log('✅ Banco de dados sincronizado com sucesso.');
  })
  .catch((err) => {
    console.error('❌ Erro ao sincronizar banco de dados:', err);
  });

// Inicialização do servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
}); 