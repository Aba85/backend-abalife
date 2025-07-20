// controllers/CarteiraController.js
const { Carteira, Saque, Usuario } = require('../prisma/client');
const { Op } = require('sequelize');

module.exports = {
  async obterSaldo(req, res) {
    try {
      const usuarioId = req.usuario.id;

      const carteira = await Carteira.findOne({ where: { usuarioId } });
      if (!carteira) return res.status(404).json({ erro: 'Carteira nÃ£o encontrada.' });

      return res.json({ saldo: carteira.saldo });
    } catch (error) {
      console.error('Erro ao obter saldo:', error);
      return res.status(500).json({ erro: 'Erro interno do servidor.' });
    }
  },

  async usarSaldoEmViagem(req, res) {
    try {
      const usuarioId = req.usuario.id;
      const { valor } = req.body;

      if (!valor || valor <= 0) return res.status(400).json({ erro: 'Valor invÃ¡lido.' });

      const carteira = await Carteira.findOne({ where: { usuarioId } });
      if (!carteira || carteira.saldo < valor) {
        return res.status(400).json({ erro: 'Saldo insuficiente.' });
      }

      carteira.saldo -= valor;
      await carteira.save();

      return res.json({ mensagem: 'Saldo utilizado com sucesso.', saldoAtual: carteira.saldo });
    } catch (error) {
      console.error('Erro ao usar saldo:', error);
      return res.status(500).json({ erro: 'Erro interno do servidor.' });
    }
  },

  async solicitarSaque(req, res) {
    try {
      const usuario = req.usuario;
      const { valor } = req.body;

      if (!valor || valor <= 0) return res.status(400).json({ erro: 'Valor invÃ¡lido.' });

      const carteira = await Carteira.findOne({ where: { usuarioId: usuario.id } });
      if (!carteira || carteira.saldo < valor) {
        return res.status(400).json({ erro: 'Saldo insuficiente.' });
      }

      // Regras de saque
      const hoje = new Date();
      const inicio = new Date(hoje.setHours(0, 0, 0, 0));
      const fim = new Date(hoje.setHours(23, 59, 59, 999));

      const limiteSaque = usuario.tipo === 'motorista' ? 1 : 0;
      const valorMinimo = usuario.tipo === 'motorista' ? 10 : 50;

      if (valor < valorMinimo) {
        return res.status(400).json({ erro: `Valor mÃ­nimo para saque: R$ ${valorMinimo}` });
      }

      const saquesHoje = await Saque.count({
        where: {
          usuarioId: usuario.id,
          createdAt: { [Op.between]: [inicio, fim] }
        }
      });

      if (usuario.tipo === 'passageiro' && saquesHoje > 0) {
        return res.status(400).json({ erro: 'Passageiro sÃ³ pode sacar uma vez por semana.' });
      }

      if (usuario.tipo === 'motorista' && saquesHoje >= 1) {
        return res.status(400).json({ erro: 'Motorista jÃ¡ fez o saque do dia.' });
      }

      carteira.saldo -= valor;
      await carteira.save();

      await Saque.create({
        usuarioId: usuario.id,
        valor,
        tipo: 'recompensa'
      });

      return res.json({ mensagem: 'Saque solicitado com sucesso.', saldoAtual: carteira.saldo });
    } catch (error) {
      console.error('Erro ao solicitar saque:', error);
      return res.status(500).json({ erro: 'Erro interno do servidor.' });
    }
  },

  async historicoSaques(req, res) {
    try {
      const usuarioId = req.usuario.id;
      const saques = await Saque.findAll({ where: { usuarioId }, order: [['createdAt', 'DESC']] });
      return res.json(saques);
    } catch (error) {
      console.error('Erro ao obter histÃ³rico de saques:', error);
      return res.status(500).json({ erro: 'Erro interno do servidor.' });
    }
  }
};



