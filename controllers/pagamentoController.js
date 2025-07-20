// caminho: controllers/pagamentoController.js

const Usuario = require('../prisma/client/Usuario');

// Atualizar forma de pagamento
exports.atualizarFormaPagamento = async (req, res) => {
  const { tipo, cartao } = req.body;

  try {
    const usuario = await Usuario.findById(req.usuarioId);

    if (!usuario) {
      return res.status(404).json({ mensagem: 'UsuÃ¡rio nÃ£o encontrado' });
    }

    if (tipo === 'pix') {
      usuario.formaPagamento = { tipo: 'pix', cartao: {} };
    } else if (tipo === 'cartao') {
      if (!cartao || !cartao.numero || !cartao.nomeTitular || !cartao.validade || !cartao.cpfTitular) {
        return res.status(400).json({ mensagem: 'Dados do cartÃ£o incompletos' });
      }

      usuario.formaPagamento = {
        tipo: 'cartao',
        cartao: {
          numero: cartao.numero,
          nomeTitular: cartao.nomeTitular,
          validade: cartao.validade,
          cpfTitular: cartao.cpfTitular,
        },
      };
    } else {
      return res.status(400).json({ mensagem: 'Tipo de pagamento invÃ¡lido' });
    }

    await usuario.save();
    res.json({ mensagem: 'Forma de pagamento atualizada com sucesso' });
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao atualizar forma de pagamento', erro: error.message });
  }
};

// Consultar forma de pagamento atual
exports.consultarFormaPagamento = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.usuarioId);
    if (!usuario) {
      return res.status(404).json({ mensagem: 'UsuÃ¡rio nÃ£o encontrado' });
    }
    res.json({ formaPagamento: usuario.formaPagamento });
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao consultar forma de pagamento' });
  }
};



