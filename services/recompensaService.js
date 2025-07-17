const db = require('../prisma/client');
const { Op } = require('sequelize');

async function calcularRecompensaPassageiro(usuarioId) {
  const corridas = await db.Corrida.findAll({
    where: {
      usuarioId,
      status: 'finalizada',
      createdAt: {
        [Op.gte]: new Date(new Date() - 30 * 24 * 60 * 60 * 1000) // últimos 30 dias
      }
    }
  });

  const qtd = corridas.length;
  if (qtd >= 4) return 0.5;
  if (qtd === 3) return 0.35;
  if (qtd === 2) return 0.25;
  if (qtd === 1) return 0.15;
  return 0;
}

async function gerarRecompensaPorIndicacao(indicadoId) {
  const indicado = await db.Usuario.findByPk(indicadoId);
  const indicacao = await db.CodigoIndicacao.findOne({
    where: { codigo: indicado.codigoIndicacao }
  });

  if (!indicacao) return;

  const valor = await calcularRecompensaPassageiro(indicadoId);
  if (valor === 0) return;

  await db.Recompensa.create({
    usuarioId: indicacao.usuarioId,
    valor,
    descricao: `Recompensa por corrida do indicado ${indicado.nome}`,
    tipo: 'indicacao'
  });
}

module.exports = {
  calcularRecompensaPassageiro,
  gerarRecompensaPorIndicacao
};

