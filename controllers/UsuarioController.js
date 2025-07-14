// controllers/UsuarioController.js

const { Usuario } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const SECRET = process.env.JWT_SECRET || 'segredo_aba_life'; // Trocar por variável segura no ambiente

const cadastrar = async (req, res) => {
  const { nome, email, cpf, celular, senha, codigoIndicacao, perfil } = req.body;

  try {
    if (!nome || !email || !cpf || !celular || !senha) {
      return res.status(400).json({ erro: 'Todos os campos obrigatórios devem ser preenchidos.' });
    }

    if (!/^\d{11}$/.test(cpf)) {
      return res.status(400).json({ erro: 'CPF inválido. Use 11 dígitos numéricos.' });
    }

    if (senha.length < 6) {
      return res.status(400).json({ erro: 'Senha deve ter no mínimo 6 caracteres.' });
    }

    const existeCpf = await Usuario.findOne({ where: { cpf } });
    if (existeCpf) {
      return res.status(409).json({ erro: 'Já existe um usuário com este CPF.' });
    }

    const existeEmail = await Usuario.findOne({ where: { email } });
    if (existeEmail) {
      return res.status(409).json({ erro: 'Já existe um usuário com este e-mail.' });
    }

    const senhaHash = await bcrypt.hash(senha, 10);

    const novoUsuario = await Usuario.create({
      nome,
      email,
      cpf,
      celular,
      senha: senhaHash,
      codigoIndicacao,
      perfil: perfil || 'passageiro',
    });

    return res.status(201).json({ mensagem: 'Usuário cadastrado com sucesso.', usuario: novoUsuario });
  } catch (error) {
    console.error('Erro ao cadastrar usuário:', error);
    return res.status(500).json({ erro: 'Erro interno ao cadastrar.' });
  }
};

const login = async (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ erro: 'Email e senha são obrigatórios.' });
  }

  try {
    const usuario = await Usuario.findOne({ where: { email } });

    if (!usuario) {
      return res.status(404).json({ erro: 'Usuário não encontrado.' });
    }

    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) {
      return res.status(401).json({ erro: 'Senha incorreta.' });
    }

    const token = jwt.sign(
      {
        id: usuario.id,
        nome: usuario.nome,
        perfil: usuario.perfil,
      },
      SECRET,
      { expiresIn: '7d' }
    );

    return res.status(200).json({ mensagem: 'Login realizado com sucesso.', token, usuario });
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    return res.status(500).json({ erro: 'Erro interno ao fazer login.' });
  }
};

module.exports = {
  cadastrar,
  login
}; 
