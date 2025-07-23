const prisma = require('../prismaClient');

const vincularIndicacao = async (req, res) => {
  const { codigoIndicante } = req.body;
  const usuarioId = req.usuario.id;

  try {
    if (!codigoIndicante) {
      return res.status(400).json({ erro: 'Código de indicação é obrigatório.' });
    }

    const indicado = await prisma.usuario.findUnique({
      where: { id: usuarioId },
    });

    if (!indicado) {
      return res.status(404).json({ erro: 'Usuário indicado não encontrado.' });
    }

    if (indicado.indicanteId) {
      return res.status(400).json({ erro: 'Você já está vinculado a um indicante.' });
    }

    const indicante = await prisma.usuario.findUnique({
      where: { codigoUnico: codigoIndicante },
    });

    if (!indicante) {
      return res.status(404).json({ erro: 'Código de indicação inválido.' });
    }

    if (indicado.perfil !== indicante.perfil) {
      return res.status(400).json({ erro: 'A indicação deve ser entre usuários do mesmo tipo.' });
    }

    // Registrar a indicação
    await prisma.usuario.update({
      where: { id: usuarioId },
      data: {
        indicanteId: indicante.id,
      },
    });

    await prisma.indicacao.create({
      data: {
        indicanteId: indicante.id,
        indicadoId: indicado.id,
      },
    });

    res.status(200).json({ mensagem: 'Indicação registrada com sucesso.' });
  } catch (error) {
    console.error('Erro ao registrar indicação:', error);
    res.status(500).json({ erro: 'Erro interno ao registrar indicação.' });
  }
};

const meuCodigoIndicacao = async (req, res) => {
  const usuarioId = req.usuario.id;

  try {
    const usuario = await prisma.usuario.findUnique({
      where: { id: usuarioId },
      select: { codigoUnico: true },
    });

    if (!usuario) {
      return res.status(404).json({ erro: 'Usuário não encontrado.' });
    }

    res.status(200).json({ codigoUnico: usuario.codigoUnico });
  } catch (error) {
    console.error('Erro ao obter código de indicação:', error);
    res.status(500).json({ erro: 'Erro interno ao buscar o código.' });
  }
};

const listarIndicados = async (req, res) => {
  const usuarioId = req.usuario.id;

  try {
    const indicacoes = await prisma.indicacao.findMany({
      where: { indicanteId: usuarioId },
      include: {
        indicado: {
          select: {
            nome: true,
            email: true,
            criadoEm: true,
            perfil: true,
          },
        },
      },
    });

    res.status(200).json({ indicados: indicacoes });
  } catch (error) {
    console.error('Erro ao listar indicados:', error);
    res.status(500).json({ erro: 'Erro interno ao buscar indicados.' });
  }
};

module.exports = {
  vincularIndicacao,
  meuCodigoIndicacao,
  listarIndicados,
}; 