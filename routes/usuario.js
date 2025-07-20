const express = require('express');
const router = express.Router();

const usuarioController = require('../controllers/UsuarioController');

// Rota para cadastro de usuário
router.post('/cadastrar', usuarioController.cadastrarUsuario);

// Rota para login de usuário
router.post('/login', usuarioController.loginUsuario);

module.exports = router; 