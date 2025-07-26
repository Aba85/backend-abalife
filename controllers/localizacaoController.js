// controllers/localizacaoController.js

const Localizacao = require('../models/Localizacao');

exports.atualizarLocalizacao = async (req, res) => {
  const { usuarioId, latitude, longitude } = req.body;

  try {
    const [localizacao, created] = await Localizacao.upsert({
      usuarioId,
      latitude,
      longitude,
    });

    return res.status(200).json({ success: true, message: 'Localização atualizada' });
  } catch (error) {
    console.error('Erro ao atualizar localização:', error);
    return res.status(500).json({ error: 'Erro ao atualizar localização' });
  }
};

exports.buscarLocalizacao = async (req, res) => {
  const { usuarioId } = req.params;

  try {
    const localizacao = await Localizacao.findOne({ where: { usuarioId } });

    if (!localizacao) {
      return res.status(404).json({ error: 'Localização não encontrada' });
    }

    return res.status(200).json(localizacao);
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao buscar localização' });
  }
};
