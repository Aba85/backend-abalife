// server.js
require('dotenv').config();
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('DATABASE_URL:', process.env.DATABASE_URL); // Prisma usa DATABASE_URL

const express = require('express');
const cors = require('cors');
const app = express();

// Prisma Client
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Middlewares globais
app.use(express.json());
app.use(cors());

// Importação das rotas (as rotas devem usar Prisma, não Sequelize)
const corridasAgendadasRoutes = require('./routes/corridasAgendadas');
const identidadeRoutes = require('./routes/identidade');
const relatorioRoutes = require('./routes/relatorios');
const usuarioRoutes = require('./routes/usuario');

// Uso das rotas com prefixo
app.use('/corridas-agendadas', corridasAgendadasRoutes);
app.use('/identidade', identidadeRoutes);
app.use('/relatorios', relatorioRoutes);
app.use('/usuarios', usuarioRoutes);

// Inicialização do servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
}); 