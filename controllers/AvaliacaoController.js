const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = {
  enviarAvaliacao: async (req, res) => {
    const { corridaId, nota, tipo } = req.body;

    if (!corridaId || !nota || !tipo) {
      return res.status(400).json({ erro: 'Campos obrigatórios: corridaId, nota, tipo' });
    }

    try {
      const avaliacao = await prisma.avaliacao.create({
        data: {
          corridaId,
          nota,
          tipo,
        },
      });

      return res.status(201).json(avaliacao);
    } catch (error) {
      return res.status(500).json({ erro: 'Erro ao registrar avaliação.' });
    }
  },

  mediaMotorista: async (req, res) => {
    const { id } = req.params;

    try {
      const result = await prisma.avaliacao.aggregate({
        _avg: { nota: true },
        where: {
          tipo: 'motorista',
          corrida: { motoristaId: parseInt(id) }
        },
      });

      return res.json({ media: result._avg.nota || 0 });
    } catch (error) {
      return res.status(500).json({ erro: 'Erro ao calcular média.' });
    }
  },

  mediaPassageiro: async (req, res) => {
    const { id } = req.params;

    try {
      const result = await prisma.avaliacao.aggregate({
        _avg: { nota: true },
        where: {
          tipo: 'passageiro',
          corrida: { passageiroId: parseInt(id) }
        },
      });

      return res.json({ media: result._avg.nota || 0 });
    } catch (error) {
      return res.status(500).json({ erro: 'Erro ao calcular média.' });
    }
  },
};
