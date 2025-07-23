// controllers/SaqueController.js

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const regras = {
  passageiro: {
    minimo: 50,
    frequenciaDias: 7,
  },
  motorista: {
    minimo: 10,
    frequenciaDias: 1,
  },
};

function diasEntreDatas(data1, data2) {
  const diff = Math.abs(data1 - data2);
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

module.exports = {
  async solicitarSaque(req, res) {
    try {
      const { valor, descricao } = req.body;
      const usuarioId = req.usuario.id;

      const usuario = await prisma.usuario.findUnique({
        where: { id: usuarioId },
      });

      if (!usuario) {
        return res.status(404).json({ erro: 'Usuário não encontrado.' });
      }

      const tipo = usuario.tipo;
      const regra = regras[tipo];

      if (!regra) {
        return res.status(400).json({ erro: 'Tipo de usuário inválido.' });
      }

      if (valor < regra.minimo) {
        return res.status(400).json({
          erro: `Valor mínimo para saque é de R$ ${regra.minimo.toFixed(2)}.`,
        });
      }

      const ultimoSaque = await prisma.saque.findFirst({
        where: { usuarioId },
        orderBy: { createdAt: 'desc' },
      });

      if (ultimoSaque) {
        const diasDesdeUltimo = diasEntreDatas(new Date(), new Date(ultimoSaque.createdAt));
        if (diasDesdeUltimo < regra.frequenciaDias) {
          return res.status(400).json({
            erro: `Você só pode sacar uma vez a cada ${regra.frequenciaDias} dia(s).`,
          });
        }
      }

      const novoSaque = await prisma.saque.create({
        data: {
          valor,
          tipoUsuario: tipo,
          usuarioId,
          descricao,
          status: 'pendente',
        },
      });

      res.status(201).json(novoSaque);
    } catch (error) {
      console.error('Erro ao solicitar saque:', error);
      res.status(500).json({ erro: 'Erro interno ao solicitar saque.' });
    }
  },

  async listarSaques(req, res) {
    try {
      const usuarioId = req.usuario.id;

      const saques = await prisma.saque.findMany({
        where: { usuarioId },
        orderBy: { createdAt: 'desc' },
      });

      res.json(saques);
    } catch (error) {
      console.error('Erro ao listar saques:', error);
      res.status(500).json({ erro: 'Erro interno ao listar saques.' });
    }
  },

  async atualizarSaque(req, res) {
    try {
      const { id } = req.params;
      const { status } = req.body;

      const saque = await prisma.saque.findUnique({
        where: { id: parseInt(id) },
      });

      if (!saque) {
        return res.status(404).json({ erro: 'Saque não encontrado.' });
      }

      const saqueAtualizado = await prisma.saque.update({
        where: { id: parseInt(id) },
        data: { status },
      });

      res.json(saqueAtualizado);
    } catch (error) {
      console.error('Erro ao atualizar saque:', error);
      res.status(500).json({ erro: 'Erro interno ao atualizar saque.' });
    }
  },

  async aprovarSaque(req, res) {
    try {
      const { id } = req.params;

      const saque = await prisma.saque.findUnique({
        where: { id: parseInt(id) },
      });

      if (!saque) {
        return res.status(404).json({ erro: 'Saque não encontrado.' });
      }

      if (saque.status === 'aprovado') {
        return res.status(400).json({ erro: 'Saque já foi aprovado.' });
      }

      const atualizado = await prisma.saque.update({
        where: { id: parseInt(id) },
        data: { status: 'aprovado' },
      });

      res.json(atualizado);
    } catch (error) {
      console.error('Erro ao aprovar saque:', error);
      res.status(500).json({ erro: 'Erro interno ao aprovar saque.' });
    }
  },

  async recusarSaque(req, res) {
    try {
      const { id } = req.params;
      const { motivo } = req.body;

      const saque = await prisma.saque.findUnique({
        where: { id: parseInt(id) },
      });

      if (!saque) {
        return res.status(404).json({ erro: 'Saque não encontrado.' });
      }

      if (saque.status === 'recusado') {
        return res.status(400).json({ erro: 'Saque já foi recusado.' });
      }

      const atualizado = await prisma.saque.update({
        where: { id: parseInt(id) },
        data: {
          status: 'recusado',
          motivo,
        },
      });

      res.json(atualizado);
    } catch (error) {
      console.error('Erro ao recusar saque:', error);
      res.status(500).json({ erro: 'Erro interno ao recusar saque.' });
    }
  },
}; 


