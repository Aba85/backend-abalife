const { Usuario, Indicacao } = require('../prisma/client');

const registrarIndicacao = async (req, res) => {
  const { codigoIndicante } = req.body;
  const usuarioId = req.usuario.id;

  try {
    if (!codigoIndicante) {
      return res.status(400).json({ erro: 'CÃ³digo de indicaÃ§Ã£o Ã© obrigatÃ³rio.' });
    }

    const indicado = await Usuario.findByPk(usuarioId);
    if (indicado.indicanteId) {
      return res.status(400).json({ erro: 'VocÃª jÃ¡ estÃ¡ vinculado a um indicante.' });
    }

    const indicante = await Usuario.findOne({ where: { codigoUnico: codigoIndicante } });

    if (!indicante) {
      return res.status(404).json({ erro: 'CÃ³digo de indicaÃ§Ã£o invÃ¡lido.' });
    }

    if (indicado.perfil !== indicante.perfil) {
      return res.status(400).json({ erro: 'A indicaÃ§Ã£o deve ser entre usuÃ¡rios do mesmo tipo.' });
    }

    // Registrar indicaÃ§Ã£o
    indicado.indicanteId = indicante.id;
    await indicado.save();

    await Indicacao.create({
      indicanteId: indicante.id,
      indicadoId: indicado.id,
    });

    res.status(200).json({ mensagem: 'IndicaÃ§Ã£o registrada com sucesso.' });
  } catch (error) {
    console.error('Erro ao registrar indicaÃ§Ã£o:', error);
    res.status(500).json({ erro: 'Erro interno ao registrar indicaÃ§Ã£o.' });
  }
};

module.exports = {
  registrarIndicacao,
};



