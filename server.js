const express = require('express');
const app = express();
const cors = require('cors');

// Configurações globais
app.use(express.json());
app.use(cors());

// Importação de rotas
const corridasAgendadasRoutes = require('./routes/corridasAgendadas');
const identidadeRoutes = require('./routes/identidade');
const relatorioRoutes = require('./routes/relatorios');
const usuarioRoutes = require('./routes/usuario'); // ✅ Adicionado

// Uso das rotas
app.use(corridasAgendadasRoutes);
app.use(identidadeRoutes);
app.use(relatorioRoutes);
app.use('/usuarios', usuarioRoutes); 
// Inicialização do servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
}); 