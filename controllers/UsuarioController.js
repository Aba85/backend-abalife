const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const prisma = new PrismaClient();

exports.cadastrarUsuario = async (req, res) => {
  const { nome, email, senha, cpf, celular, endereco } = req.body;

  try {
    const senhaCriptografada = await bcrypt.hash(senha, 10);

    const novoUsuario = await prisma.usuario.create({
      data: {
        nome,
        email,
        senha: senhaCriptografada,
        cpf,
        celular,
        endereco,
      },
    });

    res.status(201).json(novoUsuario);
  } catch (error) {
    console.error('Erro ao cadastrar usuário:', error);
    res.status(500).json({ erro: 'Erro ao cadastrar usuário' });
  }
};

exports.loginUsuario = async (req, res) => {
  const { email, senha } = req.body;

  try {
    const usuario = await prisma.usuario.findUnique({ where: { email } });

    if (!usuario) {
      return res.status(404).json({ erro: 'Usuário não encontrado' });
    }

    const senhaValida = await bcrypt.compare(senha, usuario.senha);

    if (!senhaValida) {
      return res.status(401).json({ erro: 'Senha incorreta' });
    }

    const token = jwt.sign({ id: usuario.id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    res.json({ token, usuario });
  } catch (error) {
    console.error('Erro no login:', error);
    res.status(500).json({ erro: 'Erro no login' });
  }
};
