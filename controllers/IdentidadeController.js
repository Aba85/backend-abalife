// controllers/IdentidadeController.js
const { PrismaClient } = require('@prisma/client');

const confirmarIdentidade = async (req, res) => {
  const { corridaId, motoristaCpf, confirmado } = req.body;

  try {
    const corrida = await Corrida.findByPk(corridaId);

    if (!corrida || corrida.motoristaCpf !== motoristaCpf) {
      return res.status(403).json({ erro: 'Corrida inválida ou motorista não autorizado.' });
    }

    corrida.identidadeConfirmada = confirmado;
    await corrida.save();

    return res.json({ mensagem: 'Identidade confirmada.', corrida });
  } catch (erro) {
    console.error('Erro ao confirmar identidade:', erro);
    res.status(500).json({ erro: 'Erro ao confirmar identidade.' });
  }
};

module.exports = { confirmarIdentidade };





