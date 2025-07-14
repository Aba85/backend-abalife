// controllers/SaqueController.js

const { Saque, Usuario } = require('../models');
const { Op } = require('sequelize');

const regras = {
  passageiro: {
    minimo: 50,
    frequenciaDias: 7,
  },
  motorista: {
    minimo: 10,
    frequenciaDias: 1,
  },
};

function diasEntreDatas(data1, data2) {
  const diff = Math.abs(data1 - data2);
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

module.exports = {
  async solicitarSaque(req, res) {
    try {
      const { valor, descricao } = req.body;
      const usuarioId = req.usuario.id;
      const usuario = await Usuario.findByPk(usuarioId);

      if (!usuario) {
        return res.status(404).json({ erro: 'Usuário não encontrado.' });
      }

      const tipo = usuario.tipo; // 'passageiro' ou 'motorista'
      const regra = regras[tipo];

      if (!regra) {
        return res.status(400).json({ erro: 'Tipo de usuário inválido.' });
      }

      if (valor < regra.minimo) {
        return res.status(400).json({
          erro: `Valor mínimo para saque é de R$ ${regra.minimo.toFixed(2)}.`,
        });
      }

      const ultimoSaque = await Saque.findOne({
        where: { usuarioId },
        order: [['createdAt', 'DESC']],
      });

      if (ultimoSaque) {
        const diasDesdeUltimo = diasEntreDatas(new Date(), ultimoSaque.createdAt);
        if (diasDesdeUltimo < regra.frequenciaDias) {
          return res.status(400).json({
            erro: `Você só pode sacar uma vez a cada ${regra.frequenciaDias} dia(s).`,
          });
        }
      }

      const novoSaque = await Saque.create({
        valor,
        tipoUsuario: tipo,
        usuarioId,
        descricao,
        status: 'pendente',
      });

      res.status(201).json(novoSaque);
    } catch (error) {
      console.error('Erro ao solicitar saque:', error);
      res.status(500).json({ erro: 'Erro interno ao solicitar saque.' });
    }
  },

  async listarSaques(req, res) {
    try {
      const usuarioId = req.usuario.id;

      const saques = await Saque.findAll({
        where: { usuarioId },
        order: [['createdAt', 'DESC']],
      });

      res.json(saques);
    } catch (error) {
      console.error('Erro ao listar saques:', error);
      res.status(500).json({ erro: 'Erro interno ao listar saques.' });
    }
  },
};
