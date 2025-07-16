// controllers/UsuarioController.js

const { Usuario } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'segredo_aba_life';

const validarCPF = (cpf) => {
  // Validação simples de CPF (apenas dígitos e tamanho)
  return /^\d{11}$/.test(cpf);
};

module.exports = {
  async cadastrar(req, res) {
    try {
      const { nome, email, cpf, celular, senha, codigoIndicacao, perfil } = req.body;

      // Validações básicas
      if (!nome || !email || !cpf || !celular || !senha) {
        return res.status(400).json({ erro: 'Todos os campos obrigatórios devem ser preenchidos.' });
      }

      if (!validarCPF(cpf)) {
        return res.status(400).json({ erro: 'CPF inválido. Use 11 dígitos numéricos.' });
      }

      if (senha.length < 6) {
        return res.status(400).json({ erro: 'Senha deve ter no mínimo 6 caracteres.' });
      }

      // Verificar existência prévia de CPF e e-mail
      const usuarioExistente = await Usuario.findOne({ where: { cpf } });
      if (usuarioExistente) {
        return res.status(409).json({ erro: 'Já existe um usuário com este CPF.' });
      }

      const emailExistente = await Usuario.findOne({ where: { email } });
      if (emailExistente) {
        return res.status(409).json({ erro: 'Já existe um usuário com este e-mail.' });
      }

      // Criptografar senha
      const senhaHash = await bcrypt.hash(senha, 10);

      // Criar usuário
      const novoUsuario = await Usuario.create({
        nome,
        email,
        cpf,
        celular,
        senha: senhaHash,
        codigoIndicacao,
        perfil: perfil || 'passageiro',
      });

      // Retornar resposta sem senha
      const { senha: _, ...usuarioSemSenha } = novoUsuario.toJSON();

      return res.status(201).json({
        mensagem: 'Usuário cadastrado com sucesso.',
        usuario: usuarioSemSenha
      });

    } catch (error) {
      console.error('Erro ao cadastrar usuário:', error);
      return res.status(500).json({ erro: 'Erro interno ao cadastrar usuário.' });
    }
  },

  async login(req, res) {
    try {
      const { email, senha } = req.body;

      if (!email || !senha) {
        return res.status(400).json({ erro: 'Email e senha são obrigatórios.' });
      }

      const usuario = await Usuario.findOne({ where: { email } });
      if (!usuario) {
        return res.status(404).json({ erro: 'Usuário não encontrado.' });
      }

      const senhaValida = await bcrypt.compare(senha, usuario.senha);
      if (!senhaValida) {
        return res.status(401).json({ erro: 'Senha incorreta.' });
      }

      // Gerar token JWT
      const token = jwt.sign(
        {
          id: usuario.id,
          nome: usuario.nome,
          perfil: usuario.perfil,
          cpf: usuario.cpf
        },
        JWT_SECRET,
        { expiresIn: '7d' }
      );

      const { senha: _, ...usuarioSemSenha } = usuario.toJSON();

      return res.status(200).json({
        mensagem: 'Login realizado com sucesso.',
        token,
        usuario: usuarioSemSenha
      });

    } catch (error) {
      console.error('Erro ao fazer login:', error);
      return res.status(500).json({ erro: 'Erro interno ao fazer login.' });
    }
  }
}; 
