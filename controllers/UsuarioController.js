const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');

exports.cadastrar = async (req, res) => {
  try {
    const { nome, email, senha, cpf, telefone } = req.body;

    if (!nome || !email || !senha || !cpf || !telefone) {
      return res.status(400).json({ erro: 'Todos os campos são obrigatórios.' });
    }

    const existeEmail = await Usuario.findOne({ where: { email } });
    if (existeEmail) {
      return res.status(400).json({ erro: 'Email já cadastrado.' });
    }

    const existeCpf = await Usuario.findOne({ where: { cpf } });
    if (existeCpf) {
      return res.status(400).json({ erro: 'CPF já cadastrado.' });
    }

    const senhaHash = await bcrypt.hash(senha, 10);

    const novoUsuario = await Usuario.create({
      nome,
      email,
      senha: senhaHash,
      cpf,
      telefone,
    });

    return res.status(201).json({ mensagem: 'Usuário cadastrado com sucesso', usuario: novoUsuario });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ erro: 'Erro interno no servidor.' });
  }
};

