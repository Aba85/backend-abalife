const { PrismaClient } = require('@prisma/client');

module.exports = {
  async historico(req, res) {
    try {
      const usuarioId = req.usuarioId;
      const recompensas = await Recompensa.findAll({ where: { usuarioId }, order: [['createdAt', 'DESC']] });
      return res.json(recompensas);
    } catch (error) {
      return res.status(500).json({ erro: 'Erro ao buscar histórico de recompensas' });
    }
  }
};





