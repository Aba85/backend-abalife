// controllers/corridaController.js

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const chamarCorrida = async (req, res) => {
  try {
    const { origem, destino, formaPagamento, valor, passageiroId } = req.body;

    const corrida = await prisma.corrida.create({
      data: {
        origem,
        destino,
        formaPagamento,
        valor,
        status: 'pendente',
        passageiroId,
      },
    });

    res.status(201).json(corrida);
  } catch (error) {
    console.error('Erro ao chamar corrida:', error);
    res.status(500).json({ erro: 'Erro ao criar corrida' });
  }
};

module.exports = {
  chamarCorrida,
};
