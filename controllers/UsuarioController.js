const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const prisma = new PrismaClient();

exports.cadastrarUsuario = async (req, res) => {
  const { nome, email, senha, cpf, celular, endereco } = req.body;
console.log(Object.keys(prisma)); // Mostra todos os modelos disponÃ­veis
  try {
    const usuarioExistente = await prisma.usuarios.findUnique({
      where: { email },
    });

    if (usuarioExistente) {
      return res.status(400).json({ erro: 'E-mail jÃ¡ cadastrado' });
    }

    const senhaCriptografada = await bcrypt.hash(senha, 10);

    const novoUsuario = await prisma.usuarios.create({
      data: {
        nome,
        email,
        senha: senhaCriptografada,
        cpf,
        celular,
        endereco,
      },
    });

    res.status(201).json({
      mensagem: 'UsuÃ¡rio cadastrado com sucesso',
      usuario: {
        id: novoUsuario.id,
        nome: novoUsuario.nome,
        email: novoUsuario.email,
        cpf: novoUsuario.cpf,
        celular: novoUsuario.celular,
        endereco: novoUsuario.endereco,
      },
    });
  } catch (error) {
    console.error('Erro ao cadastrar usuÃ¡rio:', error);
    res.status(500).json({ erro: 'Erro ao cadastrar usuÃ¡rio' });
  }
};

exports.loginUsuario = async (req, res) => {
  const { email, senha } = req.body;

  try {
    const usuario = await prisma.usuarios.findUnique({
      where: { email },
    });

    if (!usuario) {
      return res.status(404).json({ erro: 'UsuÃ¡rio nÃ£o encontrado' });
    }

    const senhaValida = await bcrypt.compare(senha, usuario.senha);

    if (!senhaValida) {
      return res.status(401).json({ erro: 'Senha incorreta' });
    }

    const token = jwt.sign({ id: usuario.id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    res.json({
      mensagem: 'Login realizado com sucesso',
      token,
      usuario: {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        cpf: usuario.cpf,
        celular: usuario.celular,
        endereco: usuario.endereco,
      },
    });
  } catch (error) {
    console.error('Erro no login:', error);
    res.status(500).json({ erro: 'Erro ao realizar login' });
  }
}; 

