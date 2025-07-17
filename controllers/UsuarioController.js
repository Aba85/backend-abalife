const db = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validarCPF, validarTelefone, validarSenha } = require('../validators');

const Usuario = db.usuarios;

exports.registrar = async (req, res) => {
  try {
    const {
      nome,
      email,
      cpf,
      telefone,
      senha,
      confirmarSenha,
      tipo,
    } = req.body;

    if (!validarCPF(cpf)) {
      return res.status(400).json({ mensagem: 'CPF inválido.' });
    }

    if (!validarTelefone(telefone)) {
      return res.status(400).json({ mensagem: 'Telefone inválido. Ex: 71999999999' });
    }

    const resultadoSenha = validarSenha(senha, confirmarSenha);
    if (!resultadoSenha.valido) {
      return res.status(400).json({ mensagem: resultadoSenha.mensagem });
    }

    const usuarioExistente = await Usuario.findOne({
      where: {
        [db.Sequelize.Op.or]: [
          { email },
          { cpf },
          { telefone }
        ]
      }
    });

    if (usuarioExistente) {
      return res.status(400).json({ mensagem: 'Usuário com esse e-mail, CPF ou telefone já existe.' });
    }

    const senhaHash = await bcrypt.hash(senha, 10);

    const novoUsuario = await Usuario.create({
      nome,
      email,
      cpf,
      telefone,
      senha: senhaHash,
      tipo,
    });

    return res.status(201).json({ mensagem: 'Usuário registrado com sucesso.', usuario: novoUsuario });
  } catch (error) {
    console.error('Erro ao registrar usuário:', error);
    return res.status(500).json({ mensagem: 'Erro interno no servidor.' });
  }
};

exports.login = async (req, res) => {
  try {
    const { cpf, telefone, senha } = req.body;

    if (!cpf && !telefone) {
      return res.status(400).json({ mensagem: 'Informe o CPF ou o telefone para login.' });
    }

    const usuario = await Usuario.findOne({
      where: {
        [db.Sequelize.Op.or]: [
          cpf ? { cpf } : null,
          telefone ? { telefone } : null
        ].filter(Boolean)
      }
    });

    if (!usuario) {
      return res.status(404).json({ mensagem: 'Usuário não encontrado.' });
    }

    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) {
      return res.status(401).json({ mensagem: 'Senha incorreta.' });
    }

    const token = jwt.sign(
      { id: usuario.id, tipo: usuario.tipo },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    return res.status(200).json({
      mensagem: 'Login realizado com sucesso.',
      token,
      usuario: {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        cpf: usuario.cpf,
        telefone: usuario.telefone,
        tipo: usuario.tipo
      }
    });
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    return res.status(500).json({ mensagem: 'Erro interno no servidor.' });
  }
};
