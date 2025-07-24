require('dotenv').config(); // ✅ Carrega variáveis de ambiente logo no início

const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Conexão com o PostgreSQL via Prisma
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function testarConexao() {
  try {
    await prisma.$connect();
    console.log('🔌 Conectado ao PostgreSQL com sucesso!');
  } catch (erro) {
    console.error('❌ Erro ao conectar ao PostgreSQL:', erro);
    process.exit(1);
  }
}
testarConexao();

// Importar rotas
const usuarioRoutes = require('./routes/usuarioRoutes');
const motoristaRoutes = require('./routes/motoristaRoutes');
const corridaRoutes = require('./routes/corridaRoutes');
const recompensaRoutes = require('./routes/recompensaRoutes');
const avaliacaoRoutes = require('./routes/avaliacaoRoutes');
const historicoRoutes = require('./routes/historicoRoutes');
const adminRoutes = require('./routes/adminRoutes');

// Middleware de autenticação JWT
const authMiddleware = require('./middlewares/auth');

// Usar rotas
app.use('/usuarios', usuarioRoutes);
app.use('/motoristas', motoristaRoutes);
app.use('/corridas', corridaRoutes);
app.use('/recompensas', recompensaRoutes);
app.use('/avaliacoes', avaliacaoRoutes);
app.use('/historico', historicoRoutes);
app.use('/admin', adminRoutes);

// Rota de teste protegida com token JWT
app.get('/protegida', authMiddleware, (req, res) => {
  res.json({ mensagem: `Acesso permitido. ID do usuário autenticado: ${req.usuarioId}` });
});

// Rota pública de saúde (para teste simples)
app.get('/', (req, res) => {
  res.send('🚀 API Aba Life rodando com sucesso!');
});

// Iniciar servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`✅ Servidor rodando na porta ${PORT}`);
}); 