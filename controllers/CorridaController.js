const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = {
  chamarCorrida: async (req, res) => {
    const { passageiroId, origem, destino, formaPagamento, valor } = req.body;
    try {
      const corrida = await prisma.corrida.create({
        data: {
          passageiroId,
          origem,
          destino,
          formaPagamento,
          valor,
          status: 'pendente',
        },
      });
      return res.status(201).json(corrida);
    } catch (error) {
      return res.status(500).json({ erro: 'Erro ao chamar corrida.' });
    }
  },

  listarCorridasPassageiro: async (req, res) => {
    const { id } = req.params;
    try {
      const corridas = await prisma.corrida.findMany({
        where: { passageiroId: parseInt(id) },
      });
      return res.json(corridas);
    } catch (error) {
      return res.status(500).json({ erro: 'Erro ao listar corridas.' });
    }
  },

  listarCorridasMotorista: async (req, res) => {
    const { id } = req.params;
    try {
      const corridas = await prisma.corrida.findMany({
        where: { motoristaId: parseInt(id) },
      });
      return res.json(corridas);
    } catch (error) {
      return res.status(500).json({ erro: 'Erro ao listar corridas.' });
    }
  },

  aceitarCorrida: async (req, res) => {
    const { id } = req.params;
    const { motoristaId } = req.body;
    try {
      const corrida = await prisma.corrida.update({
        where: { id: parseInt(id) },
        data: {
          motoristaId,
          status: 'aceita',
        },
      });
      return res.json(corrida);
    } catch (error) {
      return res.status(500).json({ erro: 'Erro ao aceitar corrida.' });
    }
  },

  finalizarCorrida: async (req, res) => {
    const { id } = req.params;
    try {
      const corrida = await prisma.corrida.update({
        where: { id: parseInt(id) },
        data: {
          status: 'finalizada',
          dataFim: new Date(),
        },
      });
      return res.json(corrida);
    } catch (error) {
      return res.status(500).json({ erro: 'Erro ao finalizar corrida.' });
    }
  },
};

