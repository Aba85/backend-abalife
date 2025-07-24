const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'segredo123';

module.exports = {
  cadastrarUsuario: async (req, res) => {
    const { nome, email, senha, cpf, celular, codigoIndicacao } = req.body;

    if (!nome || !email || !senha || !cpf || !celular) {
      return res.status(400).json({ erro: 'Preencha todos os campos obrigatórios.' });
    }

    try {
      const senhaCriptografada = await bcrypt.hash(senha, 10);

      const usuarioCriado = await prisma.usuario.create({
        data: {
          nome,
          email,
          senha: senhaCriptografada,
          cpf,
          celular,
          codigoIndicacao: codigoIndicacao || null, // opcional
        },
      });

      return res.status(201).json({ usuario: usuarioCriado });
    } catch (error) {
      console.error('❌ Erro ao cadastrar usuário:', error); // Exibe o erro real no terminal
      return res.status(500).json({ erro: 'Erro ao cadastrar usuário.' });
    }
  },

  loginUsuario: async (req, res) => {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res.status(400).json({ erro: 'Email e senha são obrigatórios.' });
    }

    try {
      const usuario = await prisma.usuario.findUnique({ where: { email } });
      if (!usuario) return res.status(404).json({ erro: 'Usuário não encontrado.' });

      const senhaValida = await bcrypt.compare(senha, usuario.senha);
      if (!senhaValida) return res.status(401).json({ erro: 'Senha inválida.' });

      const token = jwt.sign({ id: usuario.id }, JWT_SECRET, { expiresIn: '7d' });
      return res.json({ token, usuario });
    } catch (error) {
      console.error('❌ Erro ao realizar login:', error);
      return res.status(500).json({ erro: 'Erro ao realizar login.' });
    }
  },

  buscarPerfil: async (req, res) => {
    const { id } = req.params;
    try {
      const usuario = await prisma.usuario.findUnique({ where: { id: parseInt(id) } });
      if (!usuario) return res.status(404).json({ erro: 'Usuário não encontrado.' });
      return res.json(usuario);
    } catch (error) {
      console.error('❌ Erro ao buscar perfil:', error);
      return res.status(500).json({ erro: 'Erro ao buscar perfil.' });
    }
  },

  atualizarPerfil: async (req, res) => {
    const { id } = req.params;
    const { nome, celular } = req.body;
    try {
      const usuario = await prisma.usuario.update({
        where: { id: parseInt(id) },
        data: { nome, celular },
      });
      return res.json(usuario);
    } catch (error) {
      console.error('❌ Erro ao atualizar perfil:', error);
      return res.status(500).json({ erro: 'Erro ao atualizar perfil.' });
    }
  },
}; 