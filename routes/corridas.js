const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client'); // CORRIGIDO
const prisma = new PrismaClient();
const authMiddleware = require('../middlewares/auth');

// Chamar corrida
router.post('/chamar', authMiddleware, async (req, res) => {
  const { origem, destino, distanciaKm, valor, agendada, dataHora } = req.body;
  const passageiroId = req.userId;

  try {
    const novaCorrida = await prisma.corrida.create({
      data: {
        origem,
        destino,
        distanciaKm,
        valor,
        agendada,
        dataHora: agendada ? new Date(dataHora) : null,
        passageiroId,
        status: 'pendente',
      },
    });

    res.json(novaCorrida);
  } catch (error) {
    console.error(error); // Ajuda no debug
    res.status(500).json({ erro: 'Erro ao chamar corrida.' });
  }
});

// Motorista aceita corrida
router.post('/aceitar/:id', authMiddleware, async (req, res) => {
  const corridaId = parseInt(req.params.id); // Prisma espera número
  const motoristaId = req.userId;

  try {
    const corrida = await prisma.corrida.update({
      where: { id: corridaId },
      data: {
        motoristaId,
        status: 'aceita',
      },
    });

    res.json(corrida);
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: 'Erro ao aceitar corrida.' });
  }
});

// Finalizar corrida
router.post('/finalizar/:id', authMiddleware, async (req, res) => {
  const corridaId = parseInt(req.params.id);

  try {
    const corrida = await prisma.corrida.update({
      where: { id: corridaId },
      data: {
        status: 'finalizada',
      },
    });

    res.json(corrida);
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: 'Erro ao finalizar corrida.' });
  }
});

module.exports = router; 

