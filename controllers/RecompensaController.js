const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.recompensasPassageiro = async (req, res) => {
  const { usuarioId } = req.params;

  try {
    const usuario = await prisma.usuarios.findUnique({
      where: { id: parseInt(usuarioId) },
      include: {
        corridas: true,
        indicados: true,
      },
    });

    if (!usuario) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    const corridas30dias = usuario.corridas.filter((c) => {
      const dias = (new Date() - new Date(c.criadaEm)) / (1000 * 60 * 60 * 24);
      return dias <= 30;
    });

    const elegivel = corridas30dias.length > 0 && usuario.notaMedia >= 4.7;

    let valorPorCorrida = 0;
    switch (corridas30dias.length) {
      case 1:
        valorPorCorrida = 0.15;
        break;
      case 2:
        valorPorCorrida = 0.25;
        break;
      case 3:
        valorPorCorrida = 0.35;
        break;
      default:
        if (corridas30dias.length >= 4) valorPorCorrida = 0.5;
        break;
    }

    const totalCorridasIndicados = await prisma.corrida.count({
      where: {
        usuarioId: {
          in: usuario.indicados.map((i) => i.id),
        },
        status: 'FINALIZADA',
      },
    });

    const totalRecompensa = valorPorCorrida * totalCorridasIndicados;

    return res.status(200).json({
      elegivel,
      valorPorCorrida,
      totalCorridasIndicados,
      totalRecompensa,
    });
  } catch (error) {
    console.error('Erro ao calcular recompensas:', error);
    return res.status(500).json({ error: 'Erro ao calcular recompensas' });
  }
};




