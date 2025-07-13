// controllers/UsuarioController.js
const { Usuario } = require('../models');
const bcrypt = require('bcryptjs');

const criar = async (req, res) => {
  const { nome, email, cpf, celular, senha, codigoIndicacao, perfil } = req.body;

  try {
    if (!nome || !email || !cpf || !celular || !senha) {
      return res.status(400).json({ erro: 'Todos os campos obrigatórios devem ser preenchidos.' });
    }

    // Valida CPF (formato simples)
    if (!/^\d{11}$/.test(cpf)) {
      return res.status(400).json({ erro: 'CPF inválido. Use apenas números.' });
    }

    // Valida senha (mínimo 6 caracteres)
    if (senha.length < 6) {
      return res.status(400).json({ erro: 'Senha muito curta. Mínimo 6 caracteres.' });
    }

    // Verifica se CPF ou e-mail já existem
    const usuarioExistente = await Usuario.findOne({ where: { cpf } });
    if (usuarioExistente) {
      return res.status(409).json({ erro: 'Usuário com este CPF já existe.' });
    }

    const emailExistente = await Usuario.findOne({ where: { email } });
    if (emailExistente) {
      return res.status(409).json({ erro: 'E-mail já cadastrado.' });
    }

    const senhaHash = await bcrypt.hash(senha, 10);

    const novoUsuario = await Usuario.create({
      nome,
      email,
      cpf,
      celular,
      senha: senhaHash,
      codigoIndicacao,
      perfil: perfil || 'passageiro'
    });

    res.status(201).json({
      mensagem: 'Usuário cadastrado com sucesso.',
      usuario: {
        id: novoUsuario.id,
        nome: novoUsuario.nome,
        email: novoUsuario.email,
        cpf: novoUsuario.cpf,
        celular: novoUsuario.celular
      }
    });
  } catch (erro) {
    console.error('Erro ao cadastrar usuário:', erro);
    res.status(500).json({ erro: 'Erro interno ao cadastrar usuário.' });
  }
};

module.exports = {
  criar
};
