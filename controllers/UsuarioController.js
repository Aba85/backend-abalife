const db = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.cadastro = async (req, res) => {
  try {
    const { nome, email, senha, tipo } = req.body;

    const senhaHash = await bcrypt.hash(senha, 10);

    const novoUsuario = await db.Usuario.create({
      nome,
      email,
      senha: senhaHash,
      tipo, // 'passageiro' ou 'motorista'
    });

    res.status(201).json(novoUsuario);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao cadastrar usuário', detalhes: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, senha } = req.body;

    const usuario = await db.Usuario.findOne({ where: { email } });
    if (!usuario) return res.status(404).json({ erro: 'Usuário não encontrado' });

    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) return res.status(401).json({ erro: 'Senha incorreta' });

    const token = jwt.sign({ id: usuario.id, tipo: usuario.tipo }, 'seu_segredo_jwt', { expiresIn: '7d' });

    res.json({ token, usuario });
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao fazer login', detalhes: error.message });
  }
};

exports.getUsuarioPorId = async (req, res) => {
  try {
    const usuario = await db.Usuario.findByPk(req.params.id);
    if (!usuario) return res.status(404).json({ erro: 'Usuário não encontrado' });
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao buscar usuário' });
  }
};



