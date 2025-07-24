const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = {
  consultarRecompensas: async (req, res) => {
    const { id } = req.params;

    try {
      // Primeiro, busca o código que o usuário usa como indicante
      const usuario = await prisma.usuario.findUnique({ where: { id: parseInt(id) } });
      if (!usuario) return res.status(404).json({ erro: 'Usuário não encontrado.' });

      const seuCodigo = usuario.codigoIndicacao;

      if (!seuCodigo) return res.json({ totalCorridas: 0, totalRecompensa: 0 });

      // Busca os usuários que foram indicados por esse código
      const indicados = await prisma.usuario.findMany({
        where: { codigoIndicacao: seuCodigo },
        select: { id: true },
      });

      const idsIndicados = indicados.map(i => i.id);

      // Soma todas as corridas finalizadas feitas pelos indicados
      const corridas = await prisma.corrida.findMany({
        where: {
          passageiroId: { in: idsIndicados },
          status: 'finalizada',
        },
      });

      const totalCorridas = corridas.length;
      const totalRecompensa = totalCorridas * 0.15;

      return res.json({
        totalCorridas,
        totalRecompensa: totalRecompensa.toFixed(2),
      });

    } catch (error) {
      console.error(error);
      return res.status(500).json({ erro: 'Erro ao consultar recompensas.' });
    }
  },
};
