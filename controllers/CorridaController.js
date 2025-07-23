const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.chamarCorrida = async (req, res) => {
  try {
    const { usuarioId, origem, destino, observacoes } = req.body;

    const novaCorrida = await prisma.corrida.create({
      data: {
        usuarioId,
        origem,
        destino,
        status: 'PENDENTE',
        observacoes
      },
    });

    return res.status(201).json(novaCorrida);
  } catch (error) {
    console.error('Erro ao chamar corrida:', error);
    return res.status(500).json({ error: 'Erro ao chamar corrida' });
  }
};

exports.listarCorridasUsuario = async (req, res) => {
  const { usuarioId } = req.params;

  try {
    const corridas = await prisma.corrida.findMany({
      where: {
        usuarioId: parseInt(usuarioId),
      },
      orderBy: { id: 'desc' }
    });

    return res.status(200).json(corridas);
  } catch (error) {
    console.error('Erro ao listar corridas:', error);
    return res.status(500).json({ error: 'Erro ao buscar corridas' });
  }
};




