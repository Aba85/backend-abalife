// controllers/IndicacaoController.js
const { Indicacao, Usuario } = require('../models');

const registrarIndicacao = async (req, res) => {
  const { indicadoCpf, codigoIndicacao } = req.body;

  if (!indicadoCpf || !codigoIndicacao) {
    return res.status(400).json({ erro: 'CPF do indicado e código de indicação são obrigatórios.' });
  }

  try {
    const indicante = await Usuario.findOne({ where: { codigoIndicacao } });

    if (!indicante) {
      return res.status(404).json({ erro: 'Código de indicação inválido.' });
    }

    const existente = await Indicacao.findOne({ where: { indicadoCpf } });

    if (existente) {
      return res.status(409).json({ erro: 'Este CPF já está vinculado a uma indicação.' });
    }

    const nova = await Indicacao.create({
      indicadoCpf,
      indicanteCpf: indicante.cpf,
      confirmado: true
    });

    return res.status(201).json({ mensagem: 'Indicação registrada com sucesso.', indicacao: nova });
  } catch (erro) {
    console.error('Erro ao registrar indicação:', erro);
    return res.status(500).json({ erro: 'Erro interno ao registrar indicação.' });
  }
};

module.exports = {
  registrarIndicacao
};
