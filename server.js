﻿// server.js
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

// CORS configurado com a origem do frontend
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
}));

// ImportaÃ§Ã£o das rotas
const corridasAgendadasRoutes = require('./routes/corridasAgendadas');
const identidadeRoutes = require('./routes/identidade');
const relatorioRoutes = require('./routes/relatorios');
const usuarioRoutes = require('./routes/usuario');

// Uso das rotas com prefixo
app.use('/corridas-agendadas', corridasAgendadasRoutes);
app.use('/identidade', identidadeRoutes);
app.use('/relatorios', relatorioRoutes);
app.use('/usuarios', usuarioRoutes);

// InicializaÃ§Ã£o do servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`ðŸš€ Servidor rodando na porta ${PORT}`);
}); 

