// controllers/CarteiraController.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = {
  async obterSaldo(req, res) {
    try {
      const usuarioId = req.usuario.id;

      const carteira = await prisma.carteira.findUnique({
        where: { usuarioId },
      });

      if (!carteira) {
        return res.status(404).json({ erro: 'Carteira não encontrada.' });
      }

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

      if (!valor || valor <= 0) {
        return res.status(400).json({ erro: 'Valor inválido.' });
      }

      const carteira = await prisma.carteira.findUnique({
        where: { usuarioId },
      });

      if (!carteira) {
        return res.status(404).json({ erro: 'Carteira não encontrada.' });
      }

      if (carteira.saldo < valor) {
        return res.status(400).json({ erro: 'Saldo insuficiente.' });
      }

      const novaCarteira = await prisma.carteira.update({
        where: { usuarioId },
        data: {
          saldo: {
            decrement: valor,
          },
        },
      });

      return res.json({ saldoAtualizado: novaCarteira.saldo });
    } catch (error) {
      console.error('Erro ao usar saldo:', error);
      return res.status(500).json({ erro: 'Erro interno do servidor.' });
    }
  },
}; 