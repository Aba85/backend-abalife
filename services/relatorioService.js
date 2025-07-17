const db = require('../prisma/client');

async function gerarRelatorioRecompensas(usuarioId) {
  return await db.Recompensa.findAll({
    where: { usuarioId },
    order: [['createdAt', 'DESC']]
  });
}

module.exports = {
  gerarRelatorioRecompensas
};

