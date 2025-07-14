const express = require('express');
const cors = require('cors');
const app = express();

// Middlewares globais
app.use(express.json());
app.use(cors());

// Importação das rotas
const corridasAgendadasRoutes = require('./routes/corridasAgendadas');
const identidadeRoutes = require('./routes/identidade');
const relatorioRoutes = require('./routes/relatorios');
const usuarioRoutes = require('./routes/usuario');

// Uso das rotas
app.use(corridasAgendadasRoutes);
app.use(identidadeRoutes);
app.use(relatorioRoutes);
app.use(usuarioRoutes);

// Sincronização do banco de dados
const db = require('./models');
db.sequelize.sync({ alter: true }) // aplica alterações no banco automaticamente
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