const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const authMiddleware = require('../middlewares/auth');

// Middleware para verificar se é admin
const isAdmin = async (req, res, next) => {
  const user = await prisma.usuarios.findUnique({ where: { id: req.userId } });
  if (!user || user.perfil !== 'admin') {
    return res.status(403).json({ erro: 'Acesso negado. Apenas administradores.' });
  }
  next();
};

// Listar todos os passageiros
router.get('/passageiros', authMiddleware, isAdmin, async (req, res) => {
  try {
    const passageiros = await prisma.usuarios.findMany({ where: { perfil: 'passageiro' } });
    res.json(passageiros);
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: 'Erro ao buscar passageiros.' });
  }
});

// Listar todos os motoristas
router.get('/motoristas', authMiddleware, isAdmin, async (req, res) => {
  try {
    const motoristas = await prisma.usuarios.findMany({ where: { perfil: 'motorista' } });
    res.json(motoristas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: 'Erro ao buscar motoristas.' });
  }
});

// Listar todas as corridas
router.get('/corridas', authMiddleware, isAdmin, async (req, res) => {
  try {
    const corridas = await prisma.corridas.findMany({
      include: {
        passageiro: true,
        motorista: true,
      },
    });
    res.json(corridas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: 'Erro ao buscar corridas.' });
  }
});

module.exports = router; 