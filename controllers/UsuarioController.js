const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');

exports.cadastrar = async (req, res) => {
  try {
    const { nome, email, senha, cpf, telefone } = req.body;

    // Verificação de campos obrigatórios
    if (!nome || !email || !senha || !cpf || !telefone) {
      return res.status(400).json({ erro: 'Todos os campos são obrigatórios.' });
    }

    // Verifica se email já está cadastrado
    const existeEmail = await Usuario.findOne({ where: { email } });
    if (existeEmail) {
      return res.status(400).json({ erro: 'Email já cadastrado.' });
    }

    // Verifica se CPF já está cadastrado
    const existeCpf = await Usuario.findOne({ where: { cpf } });
    if (existeCpf) {
      return res.status(400).json({ erro: 'CPF já cadastrado.' });
    }

    // Gera hash da senha
    const senhaHash = await bcrypt.hash(senha, 10);

    // Cria o novo usuário
    const novoUsuario = await Usuario.create({
      nome,
      email,
      senha: senhaHash,
      cpf,
      telefone,
    });

    // Retorna somente os dados não sensíveis
    return res.status(201).json({
      mensagem: 'Usuário cadastrado com sucesso',
      usuario: {
        id: novoUsuario.id,
        nome: novoUsuario.nome,
        email: novoUsuario.email,
        cpf: novoUsuario.cpf,
        telefone: novoUsuario.telefone,
      },
    });

  } catch (error) {
    console.error('Erro ao cadastrar usuário:', error);
    return res.status(500).json({ erro: 'Erro interno no servidor.' });
  }
}; 
