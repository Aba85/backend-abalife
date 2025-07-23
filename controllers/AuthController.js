// backend-abalife/controllers/AuthController.js

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config/db'); // ajuste conforme a sua conexão com o banco
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET || 'seusegredoaqui';

exports.login = async (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ mensagem: 'Email e senha são obrigatórios.' });
  }

  try {
    const [result] = await db.query('SELECT * FROM usuarios WHERE email = ?', [email]);

    if (result.length === 0) {
      return res.status(401).json({ mensagem: 'Usuário não encontrado.' });
    }

    const usuario = result[0];
    const senhaCorreta = await bcrypt.compare(senha, usuario.senha);

    if (!senhaCorreta) {
      return res.status(401).json({ mensagem: 'Senha incorreta.' });
    }

    const token = jwt.sign({ id: usuario.id, email: usuario.email }, JWT_SECRET, {
      expiresIn: '7d',
    });

    return res.json({
      mensagem: 'Login realizado com sucesso.',
      token,
      usuario: {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
      },
    });
  } catch (error) {
    console.error('Erro no login:', error);
    return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
  }
}; 


