const { Recompensa, Usuario, Saque } = require('../models');
const { Op } = require('sequelize');

const listarHistorico = async (req, res) => {
  try {
    const historico = await Recompensa.findAll({
      where: { usuarioId: req.usuario.id },
      order: [['createdAt', 'DESC']],
    });

    res.status(200).json(historico);
  } catch (error) {
    console.error('Erro ao listar recompensas:', error);
    res.status(500).json({ erro: 'Erro interno ao buscar recompensas.' });
  }
};

const solicitarSaque = async (req, res) => {
  const { valor } = req.body;
  const usuario = await Usuario.findByPk(req.usuario.id);

  try {
    const saldoDisponivel = await Recompensa.sum('valor', {
      where: {
        usuarioId: usuario.id,
        status: 'disponivel'
      }
    });

    if (!saldoDisponivel || valor > saldoDisponivel) {
      return res.status(400).json({ erro: 'Saldo insuficiente.' });
    }

    // Validação de regras específicas
    const hoje = new Date();
    const dataInicio = new Date();
    let limiteValor = 0;
    let limiteData = null;

    if (usuario.perfil === 'passageiro') {
      limiteValor = 50;
      dataInicio.setDate(hoje.getDate() - 7);
      limiteData = await Saque.findOne({
        where: {
          usuarioId: usuario.id,
          createdAt: { [Op.gte]: dataInicio },
        },
      });
      if (limiteData) {
        return res.status(400).json({ erro: 'Você só pode sacar uma vez por semana.' });
      }
    }

    if (usuario.perfil === 'motorista') {
      limiteValor = 10;
      dataInicio.setDate(hoje.getDate() - 1);
      limiteData = await Saque.findOne({
        where: {
          usuarioId: usuario.id,
          createdAt: { [Op.gte]: dataInicio },
        },
      });
      if (limiteData) {
        return res.status(400).json({ erro: 'Você já solicitou um saque hoje.' });
      }
    }

    if (valor < limiteValor) {
      return res.status(400).json({ erro: `Valor mínimo para saque: R$ ${limiteValor.toFixed(2)}` });
    }

    // Registrar saque
    await Saque.create({
      usuarioId: usuario.id,
      valor,
    });

    // Atualizar recompensas como sacadas
    const recompensas = await Recompensa.findAll({
      where: {
        usuarioId: usuario.id,
        status: 'disponivel'
      },
      order: [['createdAt', 'ASC']],
    });

    let restante = valor;
    for (const rec of recompensas) {
      if (restante <= 0) break;

      if (rec.valor <= restante) {
        await rec.update({ status: 'resgatado' });
        restante -= rec.valor;
      } else {
        await rec.update({ valor: rec.valor - restante });
        restante = 0;
      }
    }

    res.status(200).json({ mensagem: 'Saque solicitado com sucesso.' });
  } catch (error) {
    console.error('Erro ao solicitar saque:', error);
    res.status(500).json({ erro: 'Erro interno ao solicitar saque.' });
  }
};

module.exports = {
  listarHistorico,
  solicitarSaque,
};
