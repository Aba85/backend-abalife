const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const authMiddleware = require('../middlewares/auth');

// Regras de recompensa por quantidade de corridas nos �ltimos 30 dias
const calcularValorPorCorrida = (quantidade) => {
  if (quantidade >= 4) return 0.5;
  if (quantidade === 3) return 0.35;
  if (quantidade === 2) return 0.25;
  if (quantidade === 1) return 0.15;
  return 0;
};

// Verifica se o passageiro � eleg�vel e calcula o valor por corrida dos indicados
router.get('/passageiro', authMiddleware, async (req, res) => {
  const userId = req.userId;
  const hoje = new Date();
  const trintaDiasAtras = new Date(hoje);
  trintaDiasAtras.setDate(hoje.getDate() - 30);

  try {
    const usuario = await prisma.usuarios.findUnique({
      where: { id: userId },
      include: {
        corridas: true,
        indicados: {
          include: {
            corridas: {
              where: {
                criadaEm: {
                  gte: trintaDiasAtras,
                },
              },
            },
          },
        },
      },
    });

    if (!usuario) {
      return res.status(404).json({ erro: 'Usu�rio n�o encontrado.' });
    }

    const corridasRecentes = usuario.corridas.filter(c => c.criadaEm >= trintaDiasAtras);
    const notaMinima = 4.7;

    const mediaAvaliacoes = 5; // substitua por l�gica real, se necess�rio
    const elegivel = corridasRecentes.length > 0 && mediaAvaliacoes >= notaMinima;

    const recompensas = usuario.indicados.map(indicado => {
      const qtdCorridas = indicado.corridas.length;
      const valorPorCorrida = calcularValorPorCorrida(qtdCorridas);

      return {
        nome: indicado.nome,
        qtdCorridas,
        valorPorCorrida,
        valorTotal: valorPorCorrida * qtdCorridas,
      };
    });

    res.json({
      elegivel,
      corridasUltimos30Dias: corridasRecentes.length,
      valorPorCorrida: calcularValorPorCorrida(corridasRecentes.length),
      recompensas,
    });
  } catch (error) {
    console.error('Erro ao buscar recompensas:', error);
    res.status(500).json({ erro: 'Erro ao calcular recompensas.' });
  }
});

module.exports = router;


