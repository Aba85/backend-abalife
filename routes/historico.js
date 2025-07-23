const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const authMiddleware = require('../middlewares/auth');

// Histórico de corridas para passageiros
router.get('/passageiro', authMiddleware, async (req, res) => {
  const userId = req.userId;

  try {
    const corridas = await prisma.corridas.findMany({
      where: { passageiroId: userId },
      orderBy: { criadaEm: 'desc' },
    });

    res.json(corridas);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao obter histórico do passageiro.' });
  }
});

// Histórico de corridas para motoristas
router.get('/motorista', authMiddleware, async (req, res) => {
  const userId = req.userId;

  try {
    const corridas = await prisma.corridas.findMany({
      where: { motoristaId: userId },
      orderBy: { criadaEm: 'desc' },
    });

    res.json(corridas);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao obter histórico do motorista.' });
  }
});

module.exports = router;


