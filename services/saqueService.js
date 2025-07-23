const db = require('../prisma/client');
const { Op } = require('sequelize');

async function podeSacar(usuarioId, tipo) {
  const now = new Date();
  const limite = tipo === 'passageiro' ? 7 : 1;
  const intervalo = tipo === 'passageiro' ? 7 * 24 * 60 * 60 * 1000 : 24 * 60 * 60 * 1000;

  const ultimoSaque = await db.Saque.findOne({
    where: { usuarioId, tipo },
    order: [['createdAt', 'DESC']]
  });

  if (!ultimoSaque) return true;

  const tempoPassado = now - new Date(ultimoSaque.createdAt);
  return tempoPassado >= intervalo;
}

async function saldoDisponivel(usuarioId) {
  const recompensas = await db.Recompensa.sum('valor', {
    where: { usuarioId }
  });

  const saques = await db.Saque.sum('valor', {
    where: { usuarioId, status: 'concluido' }
  });

  return (recompensas || 0) - (saques || 0);
}

module.exports = {
  podeSacar,
  saldoDisponivel
};





