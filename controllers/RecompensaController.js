// controllers/RecompensaController.js
const { Indicacao, Corrida, Usuario } = require('../models');
const { Op } = require('sequelize');

const calcularRecompensa = async (req, res) => {
  const { cpf } = req.params;

  try {
    const indicacoes = await Indicacao.findAll({
      where: { indicanteCpf: cpf, confirmado: true }
    });

    if (!indicacoes.length) {
      return res.json({ valorTotal: 0, detalhes: [] });
    }

    const hoje = new Date();
    const mesPassado = new Date();
    mesPassado.setDate(hoje.getDate() - 30);

    const corridasDoIndicante = await Corrida.findAll({
      where: {
        passageiroCpf: cpf,
        finalizada: true,
        data: { [Op.between]: [mesPassado, hoje] },
        notaRecebida: { [Op.ne]: null }
      }
    });

    const mediaNota =
      corridasDoIndicante.reduce((acc, c) => acc + c.notaRecebida, 0) / (corridasDoIndicante.length || 1);

    if (corridasDoIndicante.length === 0 || mediaNota < 4.7) {
      return res.json({ valorTotal: 0, mensagem: 'Não elegível: nota abaixo de 4.7 ou sem corridas.' });
    }

    const qtdCorridas = corridasDoIndicante.length;

    let valorPorCorrida = 0.15;
    if (qtdCorridas >= 2) valorPorCorrida = 0.25;
    if (qtdCorridas >= 3) valorPorCorrida = 0.35;
    if (qtdCorridas >= 4) valorPorCorrida = 0.5;

    let valorTotal = 0;
    const detalhes = [];

    for (const indicacao of indicacoes) {
      const corridasIndicados = await Corrida.findAll({
        where: {
          passageiroCpf: indicacao.indicadoCpf,
          finalizada: true,
          data: { [Op.between]: [mesPassado, hoje] }
        }
      });

      const qtd = corridasIndicados.length;
      const total = qtd * valorPorCorrida;
      valorTotal += total;

      detalhes.push({
        indicado: indicacao.indicadoCpf,
        corridas: qtd,
        valorGerado: total
      });
    }

    return res.json({
      valorTotal: valorTotal.toFixed(2),
      valorPorCorrida,
      detalhes
    });
  } catch (erro) {
    console.error('Erro ao calcular recompensa:', erro);
    return res.status(500).json({ erro: 'Erro ao calcular recompensa.' });
  }
};

module.exports = {
  calcularRecompensa
};
