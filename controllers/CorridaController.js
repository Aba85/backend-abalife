const Corrida = require('../models/corridaModel');

exports.chamarCorrida = async (req, res) => {
  try {
    const corrida = new Corrida({
      passageiroId: req.usuarioId,
      ...req.body,
    });
    await corrida.save();
    res.status(201).json(corrida);
  } catch (error) {
    res.status(400).json({ erro: 'Erro ao chamar corrida', detalhes: error.message });
  }
};

exports.corridasDisponiveis = async (req, res) => {
  try {
    const corridas = await Corrida.find({ status: 'pendente' });
    res.json(corridas);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao buscar corridas' });
  }
};

exports.aceitarCorrida = async (req, res) => {
  try {
    const corrida = await Corrida.findByIdAndUpdate(
      req.params.id,
      { motoristaId: req.usuarioId, status: 'aceita' },
      { new: true }
    );
    res.json(corrida);
  } catch (error) {
    res.status(400).json({ erro: 'Erro ao aceitar corrida' });
  }
};

exports.iniciarCorrida = async (req, res) => {
  try {
    const corrida = await Corrida.findByIdAndUpdate(
      req.params.id,
      { status: 'em_andamento', dataHoraInicio: new Date() },
      { new: true }
    );
    res.json(corrida);
  } catch (error) {
    res.status(400).json({ erro: 'Erro ao iniciar corrida' });
  }
};

exports.finalizarCorrida = async (req, res) => {
  try {
    const corrida = await Corrida.findByIdAndUpdate(
      req.params.id,
      { status: 'finalizada', dataHoraFim: new Date() },
      { new: true }
    );
    res.json(corrida);
  } catch (error) {
    res.status(400).json({ erro: 'Erro ao finalizar corrida' });
  }
};

exports.corridasEmAndamento = async (req, res) => {
  try {
    const corridas = await Corrida.find({ motoristaId: req.usuarioId, status: 'em_andamento' });
    res.json(corridas);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao buscar corridas em andamento' });
  }
};
