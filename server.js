const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Carregar variáveis de ambiente
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

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

// Exemplo de rota protegida
app.get('/protegida', authMiddleware, (req, res) => {
  res.json({ mensagem: `Acesso permitido. ID do usuário: ${req.usuarioId}` });
});

// Iniciar servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`✅ Servidor rodando na porta ${PORT}`);
}); 
