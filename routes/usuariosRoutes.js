const express = require('express');
const router = express.Router();
const UsuarioController = require('../controllers/UsuarioController');

// Listar usuários (GET)
router.get('/', UsuarioController.index);

// Cadastrar novo usuário (POST)
router.post('/', UsuarioController.cadastrarUsuario);

module.exports = router; 