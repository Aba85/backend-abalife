const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'segredo123';

module.exports = {
  login: async (req, res) => {
    const { usuario, senha } = req.body;
    if (usuario === process.env.ADMIN_USER && senha === process.env.ADMIN_PASS) {
      const token = jwt.sign({ role: 'admin' }, JWT_SECRET, { expiresIn: '1d' });
      return res.json({ token });
    }
    return res.status(401).json({ erro: 'Credenciais inválidas.' });
  },

  dashboard: async (req, res) => {
    try {
      const usuarios = await prisma.usuario.count();
      const motoristas = await prisma.motorista.count();
      const corridas = await prisma.corrida.count();
      return res.json({ usuarios, motoristas, corridas });
    } catch (error) {
      return res.status(500).json({ erro: 'Erro ao obter dados do painel.' });
    }
  },
};


