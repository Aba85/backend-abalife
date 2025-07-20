const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.cancelarCorrida = async (req, res) => {
  const { id } = req.params;

  try {
    const corrida = await prisma.corrida.update({
      where: { id: parseInt(id) },
      data: { status: 'CANCELADA' },
    });

    res.json(corrida);
  } catch (error) {
    console.error('Erro ao cancelar corrida:', error);
    res.status(500).json({ erro: 'Erro ao cancelar corrida' });
  }
};


