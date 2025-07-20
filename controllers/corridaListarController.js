const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.listarCorridas = async (req, res) => {
  try {
    const corridas = await prisma.corrida.findMany({
      orderBy: { dataHoraSolicitacao: 'desc' },
    });

    res.json(corridas);
  } catch (error) {
    console.error('Erro ao listar corridas:', error);
    res.status(500).json({ erro: 'Erro ao listar corridas' });
  }
};


