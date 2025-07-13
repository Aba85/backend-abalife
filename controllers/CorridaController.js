// controllers/CorridaController.js
const { Corrida } = require('../models');

const chamarCorrida = async (req, res) => {
  const { passageiroCpf, origem, destino, valor } = req.body;

  try {
    const nova = await Corrida.create({
      passageiroCpf,
      origem,
      destino,
      valor
    });

    return res.status(201).json({ mensagem: 'Corrida solicitada.', corrida: nova });
  } catch (erro) {
    console.error('Erro ao chamar corrida:', erro);
    res.status(500).json({ erro: 'Erro ao solicitar corrida.' });
  }
};

const aceitarCorrida = async (req, res) => {
  const { corridaId } = req.params;
  const { motoristaCpf } = req.body;

  try {
    const corrida = await Corrida.findByPk(corridaId);

    if (!corrida || corrida.status !== 'aguardando') {
      return res.status(400).json({ erro: 'Corrida indisponível.' });
    }

    corrida.motoristaCpf = motoristaCpf;
    corrida.status = 'aceita';
    await corrida.save();

    return res.json({ mensagem: 'Corrida aceita.', corrida });
  } catch (erro) {
    console.error('Erro ao aceitar corrida:', erro);
    res.status(500).json({ erro: 'Erro ao aceitar corrida.' });
  }
};

const iniciarCorrida = async (req, res) => {
  const { corridaId } = req.params;

  try {
    const corrida = await Corrida.findByPk(corridaId);

    if (!corrida || corrida.status !== 'aceita') {
      return res.status(400).json({ erro: 'Corrida não pode ser iniciada.' });
    }

    corrida.status = 'em_andamento';
    await corrida.save();

    return res.json({ mensagem: 'Corrida iniciada.', corrida });
  } catch (erro) {
    console.error('Erro ao iniciar corrida:', erro);
    res.status(500).json({ erro: 'Erro ao iniciar corrida.' });
  }
};

const finalizarCorrida = async (req, res) => {
  const { corridaId } = req.params;
  const { notaPassageiro, notaMotorista } = req.body;

  try {
    const corrida = await Corrida.findByPk(corridaId);

    if (!corrida || corrida.status !== 'em_andamento') {
      return res.status(400).json({ erro: 'Corrida não pode ser finalizada.' });
    }

    corrida.status = 'finalizada';
    corrida.notaPassageiro = notaPassageiro;
    corrida.notaMotorista = notaMotorista;
    await corrida.save();

    return res.json({ mensagem: 'Corrida finalizada.', corrida });
  } catch (erro) {
    console.error('Erro ao finalizar corrida:', erro);
    res.status(500).json({ erro: 'Erro ao finalizar corrida.' });
  }
};

const listarCorridas = async (req, res) => {
  try {
    const corridas = await Corrida.findAll({ order: [['data', 'DESC']] });
    return res.json(corridas);
  } catch (erro) {
    console.error('Erro ao listar corridas:', erro);
    res.status(500).json({ erro: 'Erro ao listar corridas.' });
  }
};

module.exports = {
  chamarCorrida,
  aceitarCorrida,
  iniciarCorrida,
  finalizarCorrida,
  listarCorridas
};
