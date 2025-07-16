// backend-abalife/src/routes/usuario.js

const express = require('express');
const roteador = express.Router();
const UsuarioController = require('../controllers/UsuarioController');

// Rota para cadastrar novo usuário
router.post ('/cadastrar', UsuarioController.cadastrar);

// Rota para login
router.post ('/login', UsuarioController.login);

// Rota para listar todos os usuários (exemplo)
roteador.get('/', UsuarioController.listar);

// Rota para buscar usuário por id
roteador.get('/:id', UsuarioController.buscarPorId);

// Rota para atualizar o usuário
router.put('/:id', UsuarioController.atualizar);

// Rota para apagar usuário
roteador.delete('/:id', UsuarioController.deletar);

módulo.exports = roteador;