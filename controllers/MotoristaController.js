const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'segredo123';

module.exports = {
  cadastrarMotorista: async (req, res) => {
    const { nome, email, senha, cnh, veiculo } = req.body;

    if (!nome || !email || !senha || !cnh || !veiculo) {
      return res.status(400).json({ erro: 'Preencha todos os campos obrigatórios.' });
    }

    try {
      const senhaCriptografada = await bcrypt.hash(senha, 10);

      const motoristaCriado = await prisma.motorista.create({
        data: {
          nome,
          email,
          senha: senhaCriptografada,
          cnh,
          veiculo,
        },
      });

      return res.status(201).json({ motorista: motoristaCriado });
    } catch (error) {
      return res.status(500).json({ erro: 'Erro ao cadastrar motorista.' });
    }
  },

  loginMotorista: async (req, res) => {
    const { email, senha } = req.body;

    try {
      const motorista = await prisma.motorista.findUnique({ where: { email } });
      if (!motorista) return res.status(404).json({ erro: 'Motorista não encontrado.' });

      const senhaValida = await bcrypt.compare(senha, motorista.senha);
      if (!senhaValida) return res.status(401).json({ erro: 'Senha inválida.' });

      const token = jwt.sign({ id: motorista.id }, JWT_SECRET, { expiresIn: '7d' });

      return res.json({ token, motorista });
    } catch (error) {
      return res.status(500).json({ erro: 'Erro no login do motorista.' });
    }
  },

  buscarPerfil: async (req, res) => {
    const { id } = req.params;
    try {
      const motorista = await prisma.motorista.findUnique({ where: { id: parseInt(id) } });
      if (!motorista) return res.status(404).json({ erro: 'Motorista não encontrado.' });
      return res.json(motorista);
    } catch (error) {
      return res.status(500).json({ erro: 'Erro ao buscar perfil do motorista.' });
    }
  },
};
