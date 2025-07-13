// controllers/RelatorioController.js
const { Corrida, Usuario, Indicacao } = require('../models');
const { Op } = require('sequelize');

const historicoRecompensas = async (req, res) => {
  const { cpf } = req.params;
  try {
    const indicacoes = await Indicacao.findAll({ where: { indicanteCpf: cpf } });
    const hoje = new Date();
    const inicio = new Date();
    inicio.setDate(hoje.getDate() - 30);

    const lista = [];

    for (const i of indicacoes) {
      const corridas = await Corrida.findAll({
        where: {
          passageiroCpf: i.indicadoCpf,
          finalizada: true,
          data: { [Op.between]: [inicio, hoje] }
        }
      });

      const usuario = await Usuario.findOne({ where: { cpf: i.indicadoCpf } });

      lista.push({
        nome: usuario.ocultarNome ? 'Indicado em modo privado' : usuario.nome,
        cpf: usuario.ocultarNome ? null : usuario.cpf,
        corridas: corridas.length
      });
    }

    return res.json({ indicacoes: lista });
  } catch (erro) {
    console.error('Erro no relatório:', erro);
    res.status(500).json({ erro: 'Erro ao gerar relatório.' });
  }
};

module.exports = {
  historicoRecompensas
};
