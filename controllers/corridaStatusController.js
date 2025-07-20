const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.atualizarStatusCorrida = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const corrida = await prisma.corrida.update({
      where: { id: parseInt(id) },
      data: { status },
    });

    res.json(corrida);
  } catch (error) {
    console.error('Erro ao atualizar status da corrida:', error);
    res.status(500).json({ erro: 'Erro ao atualizar status da corrida' });
  }
};


