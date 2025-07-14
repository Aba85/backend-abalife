const { Usuario, Indicacao } = require('../models');

const registrarIndicacao = async (req, res) => {
  const { codigoIndicante } = req.body;
  const usuarioId = req.usuario.id;

  try {
    if (!codigoIndicante) {
      return res.status(400).json({ erro: 'Código de indicação é obrigatório.' });
    }

    const indicado = await Usuario.findByPk(usuarioId);
    if (indicado.indicanteId) {
      return res.status(400).json({ erro: 'Você já está vinculado a um indicante.' });
    }

    const indicante = await Usuario.findOne({ where: { codigoUnico: codigoIndicante } });

    if (!indicante) {
      return res.status(404).json({ erro: 'Código de indicação inválido.' });
    }

    if (indicado.perfil !== indicante.perfil) {
      return res.status(400).json({ erro: 'A indicação deve ser entre usuários do mesmo tipo.' });
    }

    // Registrar indicação
    indicado.indicanteId = indicante.id;
    await indicado.save();

    await Indicacao.create({
      indicanteId: indicante.id,
      indicadoId: indicado.id,
    });

    res.status(200).json({ mensagem: 'Indicação registrada com sucesso.' });
  } catch (error) {
    console.error('Erro ao registrar indicação:', error);
    res.status(500).json({ erro: 'Erro interno ao registrar indicação.' });
  }
};

module.exports = {
  registrarIndicacao,
};
