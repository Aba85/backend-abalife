// middlewares/validarSaque.js

const { Saque } = require('../prisma/client');
const { Op } = require('sequelize');

module.exports = async function validarSaque(req, res, next) {
  const usuario = req.usuario;
  const { valor } = req.body;

  if (!valor || valor <= 0) {
    return res.status(400).json({ erro: 'Valor do saque invÃ¡lido.' });
  }

  const limite = usuario.tipo === 'motorista' ? 10 : 50;
  if (valor < limite) {
    return res.status(400).json({ erro: `Valor mÃ­nimo para saque Ã© R$ ${limite}` });
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
    return res.status(400).json({ erro: 'Limite de frequÃªncia de saque excedido.' });
  }

  next();
};



