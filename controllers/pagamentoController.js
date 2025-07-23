// caminho: controllers/pagamentoController.js

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Atualizar forma de pagamento
exports.atualizarFormaPagamento = async (req, res) => {
  const { tipo, cartao } = req.body;

  try {
    const usuario = await prisma.usuario.findUnique({
      where: { id: req.usuarioId },
    });

    if (!usuario) {
      return res.status(404).json({ mensagem: 'Usuário não encontrado' });
    }

    let formaPagamento = {};

    if (tipo === 'pix') {
      formaPagamento = { tipo: 'pix', cartao: null };
    } else if (tipo === 'cartao') {
      if (
        !cartao ||
        !cartao.numero ||
        !cartao.nomeTitular ||
        !cartao.validade ||
        !cartao.cpfTitular
      ) {
        return res.status(400).json({ mensagem: 'Dados do cartão incompletos' });
      }

      formaPagamento = {
        tipo: 'cartao',
        cartao: {
          numero: cartao.numero,
          nomeTitular: cartao.nomeTitular,
          validade: cartao.validade,
          cpfTitular: cartao.cpfTitular,
        },
      };
    } else {
      return res.status(400).json({ mensagem: 'Tipo de pagamento inválido' });
    }

    await prisma.usuario.update({
      where: { id: req.usuarioId },
      data: {
        formaPagamento,
      },
    });

    return res.json({ mensagem: 'Forma de pagamento atualizada com sucesso' });
  } catch (error) {
    return res.status(500).json({
      mensagem: 'Erro ao atualizar forma de pagamento',
      erro: error.message,
    });
  }
};

// Consultar forma de pagamento atual
exports.consultarFormaPagamento = async (req, res) => {
  try {
    const usuario = await prisma.usuario.findUnique({
      where: { id: req.usuarioId },
      select: {
        formaPagamento: true,
      },
    });

    if (!usuario) {
      return res.status(404).json({ mensagem: 'Usuário não encontrado' });
    }

    return res.json({ formaPagamento: usuario.formaPagamento });
  } catch (error) {
    return res.status(500).json({
      mensagem: 'Erro ao consultar forma de pagamento',
      erro: error.message,
    });
  }
}; 