const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const JWT_SECRET = process.env.JWT_SECRET || 'segredoSuperSecreto';

// Criar usu�rio (passageiro ou motorista)
router.post('/criar', async (req, res) => {
  const { nome, email, senha, tipo, codigoIndicacao } = req.body;

  try {
    const senhaHash = await bcrypt.hash(senha, 10);

    const novoUsuario = await prisma.usuarios.create({
      data: {
        nome,
        email,
        senha: senhaHash,
        tipo, // 'passageiro' ou 'motorista'
        codigoIndicacao,
      },
    });

    res.status(201).json(novoUsuario);
  } catch (erro) {
    console.error(erro);
    res.status(400).json({ erro: 'Erro ao criar usu�rio.' });
  }
});

// Login de usu�rio
router.post('/login', async (req, res) => {
  const { email, senha } = req.body;

  try {
    const usuario = await prisma.usuarios.findUnique({ where: { email } });

    if (!usuario) return res.status(404).json({ erro: 'Usu�rio n�o encontrado.' });

    const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
    if (!senhaCorreta) return res.status(401).json({ erro: 'Senha inv�lida.' });

    const token = jwt.sign({ id: usuario.id, tipo: usuario.tipo }, JWT_SECRET, {
      expiresIn: '7d',
    });

    res.json({ token, usuario });
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ erro: 'Erro no login.' });
  }
});

// Vincular c�digo de indica��o (s� uma vez)
router.post('/vincular-indicacao', async (req, res) => {
  const { idPassageiro, codigoIndicante } = req.body;

  try {
    const passageiro = await prisma.usuarios.findUnique({
      where: { id: idPassageiro },
    });

    if (!passageiro || passageiro.tipo !== 'passageiro') {
      return res.status(400).json({ erro: 'Passageiro inv�lido.' });
    }

    if (passageiro.codigoIndicante) {
      return res.status(400).json({ erro: 'C�digo j� vinculado.' });
    }

    const indicante = await prisma.usuarios.findFirst({
      where: { codigo: codigoIndicante },
    });

    if (!indicante) {
      return res.status(404).json({ erro: 'C�digo de indica��o inv�lido.' });
    }

    const atualizado = await prisma.usuarios.update({
      where: { id: idPassageiro },
      data: { codigoIndicante },
    });

    res.json({ status: 'V�nculo realizado com sucesso.', usuario: atualizado });
  } catch (erro) {
    console.error(erro);
    res.status(400).json({ erro: 'Erro ao vincular c�digo.' });
  }
});

module.exports = router;


