// controllers/CorridaAgendadaController.js
const { PrismaClient } = require('@prisma/client');

const agendarCorrida = async (req, res) => {
  const { passageiroCpf, origem, destino, dataHoraAgendada, tipo, valor, motoristaCpf } = req.body;

  try {
    const nova = await CorridaAgendada.create({
      passageiroCpf,
      origem,
      destino,
      dataHoraAgendada,
      tipo,
      valor,
      motoristaCpf: motoristaCpf || null
    });

    return res.status(201).json({ mensagem: 'Corrida agendada.', corrida: nova });
  } catch (erro) {
    console.error('Erro ao agendar corrida:', erro);
    res.status(500).json({ erro: 'Erro ao agendar corrida.' });
  }
};

const listarCorridasAgendadas = async (req, res) => {
  try {
    const todas = await CorridaAgendada.findAll({ order: [['dataHoraAgendada', 'ASC']] });
    res.json(todas);
  } catch (erro) {
    console.error('Erro ao listar corridas agendadas:', erro);
    res.status(500).json({ erro: 'Erro ao listar corridas.' });
  }
};

module.exports = {
  agendarCorrida,
  listarCorridasAgendadas
};



