// middlewares/validarSaque.js

const { Saque } = require('../prisma/client');
const { Op } = require('sequelize');

module.exports = async function validarSaque(req, res, next) {
  const usuario = req.usuario;
  const { valor } = req.body;

  if (!valor || valor <= 0) {
    return res.status(400).json({ erro: 'Valor do saque inválido.' });
  }

  const limite = usuario.tipo === 'motorista' ? 10 : 50;
  if (valor < limite) {
    return res.status(400).json({ erro: `Valor mínimo para saque é R$ ${limite}` });
  }

  const dataLimite = new Date();
  dataLimite.setDate(dataLimite.getDate() - (usuario.tipo === 'motorista' ? 1 : 7));

  const saquesRecentes = await Saque.findAll({
    where: {
      usuarioId: usuario.id,
      createdAt: { [Op.gte]: dataLimite }
    }
  });

  if (saquesRecentes.length > 0) {
    return res.status(400).json({ erro: 'Limite de frequência de saque excedido.' });
  }

  next();
};

