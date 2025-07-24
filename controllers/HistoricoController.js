const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = {
  historicoPassageiro: async (req, res) => {
    const { id } = req.params;
    try {
      const corridas = await prisma.corrida.findMany({
        where: { passageiroId: parseInt(id), status: 'finalizada' },
        orderBy: { dataFim: 'desc' },
      });
      return res.json(corridas);
    } catch (error) {
      return res.status(500).json({ erro: 'Erro ao buscar histórico do passageiro.' });
    }
  },

  historicoMotorista: async (req, res) => {
    const { id } = req.params;
    try {
      const corridas = await prisma.corrida.findMany({
        where: { motoristaId: parseInt(id), status: 'finalizada' },
        orderBy: { dataFim: 'desc' },
      });
      return res.json(corridas);
    } catch (error) {
      return res.status(500).json({ erro: 'Erro ao buscar histórico do motorista.' });
    }
  },
};
