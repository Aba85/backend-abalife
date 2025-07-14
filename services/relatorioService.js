const db = require('../models');

async function gerarRelatorioRecompensas(usuarioId) {
  return await db.Recompensa.findAll({
    where: { usuarioId },
    order: [['createdAt', 'DESC']]
  });
}

module.exports = {
  gerarRelatorioRecompensas
};
