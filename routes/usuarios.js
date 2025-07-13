const express = require('express');
const router = express.Router();
const { Usuario } = require('../models');

router.post('/cadastrar', async (req, res) => {
  const { nome, email, cpf, celular, senha, codigoIndicacao } = req.body;

  if (!nome || !email || !cpf || !celular || !senha) {
    return res.status(400).json({ error: 'Todos os campos obrigatórios devem ser preenchidos.' });
  }

  try {
    const usuarioExistente = await Usuario.findOne({ where: { cpf } });

    if (usuarioExistente) {
      return res.status(400).json({ error: 'CPF já cadastrado.' });
    }

    const novoUsuario = await Usuario.create({
      nome,
      email,
      cpf,
      celular,
      senha,
      codigoIndicacao
    });

    return res.status(201).json({ message: 'Usuário cadastrado com sucesso!', usuario: novoUsuario });
  } catch (error) {
    console.error('Erro no cadastro:', error);
    return res.status(500).json({ error: 'Erro ao cadastrar usuário.' });
  }
});

module.exports = router;
